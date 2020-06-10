#!/usr/bin/python3

import time
import json
import pwd
import grp
import os
import os.path
import argparse
import logging
import socket
import uuid
import platform
import configparser
import contextlib
import ipaddress

import requests
from zeroconf import ServiceBrowser, Zeroconf, ServiceStateChange
from netifaces import interfaces, ifaddresses, AF_INET
import tornado.web
import tornado.locks
import tornado.ioloop
import tornado.process
import tornado.websocket
import tornado.httpserver

import neopixel
from Adafruit_MCP9808 import MCP9808
import Adafruit_TCS34725
from Adafruit_MPR121 import MPR121

from font import font


_FAV_FILENAME_FORMAT = 'fav_{}.py'


@contextlib.contextmanager
def stop_sensors():
    sensors.sensor_read_loop.stop()
    yield
    sensors.sensor_read_loop.start()


def get_ip():
    adresses = []
    for iface_name in interfaces():
        default = [{'addr': 'No IP addr'}]
        adresses.extend([i['addr'] for i in ifaddresses(iface_name).setdefault(AF_INET, default)])
    for address in adresses:
        addr = ipaddress.IPv4Address(address)
        if addr.is_private and not addr.is_loopback:
            return address


# LED configuration.
class LEDData:
    # GPIO pin connected to the pixels (18 uses PWM!).
    LED_PIN = 18
    # LED signal frequency in hertz (usually 800khz)
    LED_FREQ_HZ = 800000
    # DMA channel to use for generating signal (try 5)
    LED_DMA = 5
    # Set to 0 for darkest and 255 for brightest
    LED_BRIGHTNESS = 150
    # True to invert the signal (when using NPN transistor level shift)
    LED_INVERT = False
    # Set to '1' for GPIOs 13, 19, 41, 45 or 53
    LED_CHANNEL = 0

    def __init__(self, LED_COUNT_X, LED_COUNT_Y, LED_COUNT_E, LED_STRIP):
        self.LED_COUNT_X = LED_COUNT_X
        self.LED_COUNT_Y = LED_COUNT_Y
        self.LED_COUNT_E = LED_COUNT_E
        self.LED_STRIP = LED_STRIP
        self.LED_COUNT_X_E = LED_COUNT_X + LED_COUNT_E
        self.LED_COUNT_X_1 = LED_COUNT_X - 1
        self.LED_COUNT_Y_1 = LED_COUNT_Y - 1
        # Total LED pixels on the stripe.
        self.LED_COUNT = LED_COUNT_X * (LED_COUNT_Y + LED_COUNT_E)


# Font configuration.
class FontData:
    # Font tuple index for font x dimentions.
    FONT_TUPLE_X = 0
    # Font tuple index for font y dimentions.
    FONT_TUPLE_Y = 1
    # Font tuple index for character data table.
    FONT_TUPLE_CH = 2
    # Font character spacing pixels in x direction.
    FONT_SPACE_X = 1

    def __init__(self, led_data, font):
        # Font offset from top of matrix in LED pixels in y direction.
        self.FONT_OFFSET_Y = (led_data.LED_COUNT_Y - font[self.FONT_TUPLE_Y]) // 2
        # Font offset between characters in LED pixels in x direction.
        self.FONT_OFFSET_X = font[self.FONT_TUPLE_X] + self.FONT_SPACE_X


# Draw chars on NeoPixel LED Matrix
#
# - mounted as single strip/starting on bottom right corner
# - might have empty LEDs, which look to the inside
# - LED position increments from start to the end (0..sum-1 / including the empty LEDs)
#   sum = x * y + (y - 1) * e
#
# Example for a 7x7 LED Matrix with 1 Empty LED:
# |--L---L---L---L---L--...
# E
# |--L---L---L---L---L---L---L--|
#                               E
# |--L---L---L---L---L---L---L--|
# E
# |--L---L---L---L---L---L---L--<< start
#
# Character coordinates have its origin in top left corner
# |---->  x axis (0..n-1)
# |
# v
# y axis (0..n-1)
class NeoPixelHandler:
    def __init__(self):
        self.strip_handler = neopixel.Adafruit_NeoPixel(led_data.LED_COUNT, led_data.LED_PIN,
                                                        led_data.LED_FREQ_HZ, led_data.LED_DMA,
                                                        led_data.LED_INVERT,
                                                        led_data.LED_BRIGHTNESS,
                                                        led_data.LED_CHANNEL,
                                                        led_data.LED_STRIP)
        self.strip_handler.begin()
        self.strip_handler.setBrightness(50)
        logging.info('LED strip started')

        msg = 'Neo pixel LEDs: {}, X: {}, Y: {}, font X: {}, font Y: {}.'
        logging.debug(msg.format(led_data.LED_COUNT, led_data.LED_COUNT_X, led_data.LED_COUNT_Y,
                                 selected_font[font_data.FONT_TUPLE_X],
                                 selected_font[font_data.FONT_TUPLE_Y]))
        self.act_time = 0
        self.old_time = 0
        self.message = ''
        self.i = font_data.FONT_OFFSET_X
        self.red = 100
        self.blue = 0
        self.green = 0
        self.color = neopixel.Color(50, 50, 0)

    def set_pixel(self, x, y, color):
        if not(x in range(0, led_data.LED_COUNT_X)):
            return
        if not(y in range(font_data.FONT_OFFSET_Y, font_data.FONT_OFFSET_Y + led_data.LED_COUNT_Y)):
            return
        # Check for odd/even Y lines. Stripe starts at bottom right (from front).
        if y % 2:
            pos = (led_data.LED_COUNT_Y_1 - y) * led_data.LED_COUNT_X_E + x
        else:
            pos = (led_data.LED_COUNT_Y_1 - y) * led_data.LED_COUNT_X_E + led_data.LED_COUNT_X_1 - x
        self.strip_handler.setPixelColor(pos, color)

    def draw_char(self, char, x_pos, y_pos):
        char_num = ord(char) - 32
        # Loop over x direction.
        for x in range(selected_font[font_data.FONT_TUPLE_X]):
            # Loop over y direction.
            for y in range(selected_font[font_data.FONT_TUPLE_Y]):
                # Character position in font table.
                char_pos = (char_num * selected_font[font_data.FONT_TUPLE_X]) + x
                if selected_font[font_data.FONT_TUPLE_CH][char_pos] & 1 << y:
                    self.color = neopixel.Color(self.red, self.green, self.blue)
                    self.set_pixel(x + x_pos, y + y_pos, self.color)

    def print_string(self):
        message_list = list(self.message)
        message_len = len(message_list)

        self.act_time = time.time() * 1000
        if (self.act_time - self.old_time) > 150:
            self.old_time = self.act_time
            self.clean_strip()
            if self.i in range((-(font_data.FONT_OFFSET_X)) * message_len,
                               font_data.FONT_OFFSET_X + 1):
                for j in range(0, message_len):
                    self.draw_char(message_list[j], self.i + (j * font_data.FONT_OFFSET_X),
                                   font_data.FONT_OFFSET_Y)
                self.strip_handler.show()
                self.i -= 1
            else:
                self.i = font_data.FONT_OFFSET_X

    def clean_strip(self):
        for i in range(self.strip_handler.numPixels()):
            self.strip_handler.setPixelColor(i, neopixel.Color(0, 0, 0))
        self.strip_handler.show()

    def set_brightness(self, val):
        # Protect from overflow and scale brightness from 0-100 to 0-255
        brightness = int(val * 1.55) if val < 100 else 150
        self.strip_handler.setBrightness(brightness)

    def set_color(self, color, val):
        val = val if val > 0 else 0
        val = val if val != '' else 0
        val = int(val * 2.55)
        logging.debug('Color {}, value {}.'.format(color, val))
        setattr(self, color, val)


# Read out sensors: color sensor / temperature sensor / touch sensor
class SensorHandler:
    def __init__(self):
        # Temp Sensor.
        self._sensor_temp = MCP9808.MCP9808()
        try:
            self._sensor_temp.begin()
            logging.info('Temperature sensor started.')
        except Exception as err:
            self._sensor_temp = None
            msg = 'An error occured while setting up temperature sensor: {}'
            logging.error(msg.format(str(err)))

        # Color Sensor.
        self._sensor_tcs = None
        try:
            self._sensor_tcs = Adafruit_TCS34725.TCS34725()
            self._sensor_tcs.set_interrupt(True)
            logging.info('Color sensor started.')
        except Exception as err:
            msg = 'An error occured while setting up color sensor: {}'
            logging.error(msg.format(str(err)))

        self._touch_sensor = MPR121.MPR121()
        try:
            self._touch_sensor.begin()
            logging.info('Touch sensor started.')
        except Exception as err:
            self._touch_sensor = None
            msg = 'An error occured while setting up touch sensor: {}'
            logging.error(msg.format(str(err)))

        self.temperature = 0
        self.r, self.g, self.b, self.c = [0, 0, 0, 0]
        self.color_temp = 0
        self.lux = 0
        self.touched_list = []
        self._last_touched_data = 0
        self._collect_touches = False

        self.sensor_read_loop = tornado.ioloop.PeriodicCallback(self._update, 1000)
        self.sensor_read_loop.start()

    def interrupt_color_sensor(self, value):
        if self._sensor_tcs is not None:
            self._sensor_tcs.set_interrupt(value)

    def _update(self):
        if self._sensor_temp is not None:
            self.temperature = self._sensor_temp.readTempC()

        if self._sensor_tcs is not None:
            # Read the R, G, B, C color data.
            self.r, self.g, self.b, self.c = self._sensor_tcs.get_raw_data()
            # Calculate color temperature using utility functions.
            self.color_temp = Adafruit_TCS34725.calculate_color_temperature(self.r, self.g, self.b)
            # Calculate lux with another utility function.
            self.lux = Adafruit_TCS34725.calculate_lux(self.r, self.g, self.b)

        if self._touch_sensor is None:
            return
        touch_data = self._touch_sensor.touched()
        touched = False
        for i in range(12):
            pin_bit = 1 << i
            # Only transitions from not touched to touched are valid.
            if touch_data & pin_bit and not self._last_touched_data & pin_bit:
                touched = True
                break
        self._last_touched_data = touch_data

        list_len = len(self.touched_list)
        # Start storing touch events on initial touch.
        if touched and list_len == 0:
            self.touched_list.append(touched)
            self._collect_touches = True
        # Fill events until list is full.
        elif self._collect_touches and list_len < 20:
            self.touched_list.append(touched)

    def reset_touch_count(self):
        self._collect_touches = False
        self.touched_list.clear()

    def close(self):
        self.sensor_read_loop.stop()
        self._sensor_temp = None
        self._touch_sensor = None
        if self._sensor_tcs is not None:
            self._sensor_tcs.set_interrupt(True)
            self._sensor_tcs.disable()
            self._sensor_tcs = None


# Process data/code to show it or to execute it.
class CommandHandler:
    def __init__(self):
        self.pixel_handler = NeoPixelHandler()
        self.text_loop = tornado.ioloop.PeriodicCallback(self.pixel_handler.print_string, 50)
        self._stop_loop_handler = None

    def process_text(self, data, shutdown_later=False):
        self.stop()
        if shutdown_later:
            self._stop_loop_handler = tornado.ioloop.IOLoop.instance().call_later(20, self.stop)
        self.pixel_handler.set_brightness(int(data['brightness']))
        self.pixel_handler.set_color('red', int(data['red']))
        self.pixel_handler.set_color('green', int(data['green']))
        self.pixel_handler.set_color('blue', int(data['blue']))
        self._set_text(data['text'])

    def _set_text(self, val):
        for ch in val:
            char = ord(ch)
            # Check if current character is on the font table.
            if ((char - 32) > (len(selected_font[font_data.FONT_TUPLE_CH]) /
                               selected_font[font_data.FONT_TUPLE_X])):
                # Check for special chars in German language and replace them.
                if ((192 <= char) and (char <= 198)):
                    new_char = 'A'
                elif ((200 <= char) and (char <= 203)):
                    new_char = 'E'
                elif ((210 <= char) and (char <= 214)):
                    new_char = 'O'
                elif ((217 <= char) and (char <= 220)):
                    new_char = 'U'
                elif ((224 <= char) and (char <= 230)):
                    new_char = 'a'
                elif ((232 <= char) and (char <= 235)):
                    new_char = 'e'
                elif ((242 <= char) and (char <= 246)):
                    new_char = 'o'
                elif ((249 <= char) and (char <= 252)):
                    new_char = 'u'
                else:
                    # Default for unknown characters.
                    new_char = '_'
                val = val.replace(ch, new_char)
        self.pixel_handler.message = val
        self.text_loop.start()

    def stop(self):
        if self.text_loop.is_running():
            self.text_loop.stop()
        self.pixel_handler.clean_strip()
        if self._stop_loop_handler is not None:
            tornado.ioloop.IOLoop.instance().remove_timeout(self._stop_loop_handler)
            self._stop_loop_handler = None


class IdentifyHandler(tornado.web.RequestHandler):
    async def get(self):
        logging.debug('[HTTP](IdentifyHandler) Identify called.')
        uuid = self.get_argument('uuid', None)
        if not uuid:
            self.clear()
            self.set_status(400)
            self.finish('No UUID supplied.')
            return
        if uuid != RPi_UUID:
            self.clear()
            self.set_status(400)
            self.finish('Device UUID mismatch.')
            return
        data = {}
        data['brightness'] = 15
        data['red'] = 100
        data['green'] = 100
        data['blue'] = 100
        data['text'] = platform.node()
        async with command_handler_lock:
            command_handler.process_text(data, shutdown_later=True)


class WSHandler(tornado.websocket.WebSocketHandler):
    def __init__(self, application, request, **kwargs):
        super().__init__(application, request, **kwargs)
        self._read_sensors_loop = None

    def check_origin(self, origin):
        return True

    def open(self):
        logging.debug('[WS] Connection was opened.')
        self._read_sensors_loop = tornado.ioloop.PeriodicCallback(self.send_sensor_data, 800)
        self._read_sensors_loop.start()

    async def on_message(self, message):
        logging.debug('[WS] Incoming message:', message.encode('utf-8'))
        try:
            data = json.loads(message)
        except (TypeError, ValueError) as err:
            logging.warning('Cannot parse JSON. {}. Skipping...'.format(err))
            return
        # Block any attempt at trying to execute multiple scripts or display more than one text.
        # I.e. Until one coroutine finishes its bussiness, do not schedule more operations.
        async with command_handler_lock:
            if data['name'] == 'text':
                command_handler.process_text(data['value'])
            elif data['name'] == 'code':
                await self._run_code(data['value'])
            elif data['name'] == 'save':
                self._save_favorite(data)
            elif data['name'] == 'color_sensor':
                await self._handle_color_sensor(data['value'])

    async def _run_code(self, data):
        # Do not attempt to execute favorite functions.
        with stop_sensors():
            async with sensors_lock:
                script_name = 'blockly_script'
                with open(script_name, 'w') as f:
                    f.write(data)
                os.chown(script_name, pwd.getpwnam('pi').pw_uid, grp.getgrnam('pi').gr_gid)
                command_handler.stop()
                try:
                    subprocess = tornado.process.Subprocess(['sudo', 'python', script_name])
                except Exception as err:
                    msg = {'name': 'subprocess_failed', 'value': str(err)}
                    if self.ws_connection is None:
                        return
                    await self.write_message(msg)
                    logging.error(err)
                    return
                logging.debug('Subprocess launched with PID: {}.'.format(subprocess.pid))
                return_code = await subprocess.wait_for_exit(raise_error=False)
                msg = {'name': 'subprocess_complete', 'value': return_code}
                if self.ws_connection is None:
                    return
                await self.write_message(msg)

    async def _handle_color_sensor(self, value):
        async with sensors_lock:
            interrupt_value = False if value == 1 else True
            sensors.interrupt_color_sensor(interrupt_value)

    def _save_favorite(self, data):
        code = data['value']
        fav_id = int(data['id'])
        script_name = _FAV_FILENAME_FORMAT.format(fav_id)
        with open(script_name, 'w') as f:
            f.write(code)
        os.chown(script_name, pwd.getpwnam('pi').pw_uid, grp.getgrnam('pi').gr_gid)

    # Cannot use async/await syntax. See: https://github.com/tornadoweb/tornado/issues/1650
    @tornado.gen.coroutine
    def on_close(self):
        logging.debug('[WS] Connection was closed.')
        self._read_sensors_loop.stop()

        with (yield command_handler_lock.acquire()):
            command_handler.stop()

    async def send_sensor_data(self):
        async with sensors_lock:
            # Do not attempt to write to dead WS connection.
            if self.ws_connection is None:
                return
            await self.write_message({
                'name': 'color',
                'value': {
                    'r': sensors.r,
                    'g': sensors.g,
                    'b': sensors.b,
                    'c': sensors.c,
                    'temp': sensors.color_temp,
                    'lux': sensors.lux
                }
            })

            # Do not attempt to write to dead WS connection.
            if self.ws_connection is None:
                return
            await self.write_message({
                'name': 'temp',
                'value': sensors.temperature
            })


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('led_size_x', help='LED matrix size in X axis >= 7', type=int, nargs='?')
    parser.add_argument('led_size_y', help='LED matrix size in Y axis >= 7', type=int, nargs='?')
    parser.add_argument('empty_led_x', help='Number of empty LEDs in X axis', type=int, nargs='?')
    parser.add_argument('font_type', help='Font type, either 5x7 or 8x12', nargs='?')
    led_strip_type_help = 'LED stripe type, 0 = WS2811_STRIP_GRB / 1 = SK6812_STRIP_GRBW'
    parser.add_argument('led_strip_type', help=led_strip_type_help, type=int, nargs='?')
    parsed_args = parser.parse_args()

    global led_data, font_data, selected_font

    # Minimal Number of LED pixels in X/Y direction.
    LED_COUNT_MIN = 16

    # LED strip configuration:
    if parsed_args.led_size_x and parsed_args.led_size_y:
        if parsed_args.led_size_x < LED_COUNT_MIN:
            LED_COUNT_X = LED_COUNT_MIN
        else:
            LED_COUNT_X = parsed_args.led_size_x
        if parsed_args.led_size_y < LED_COUNT_MIN:
            LED_COUNT_Y = LED_COUNT_MIN
        else:
            LED_COUNT_Y = parsed_args.led_size_y
    else:
        # Default is the minimal setup of 7x7 without any empty led.
        LED_COUNT_X = LED_COUNT_MIN
        LED_COUNT_Y = LED_COUNT_MIN

    if parsed_args.empty_led_x:
        LED_COUNT_E = parsed_args.empty_led_x
    else:
        # Default is the minimal setup of 7x7 without any empty led
        LED_COUNT_E = 0

    if parsed_args.font_type:
        selected_font = font(parsed_args.font_type)
    else:
        # Default is the minimal setup of 7x7 without any empty led
        selected_font = font('8x12')

    if parsed_args.led_strip_type and parsed_args.led_strip_type == 1:
        LED_STRIP = neopixel.ws.SK6812_STRIP_GRBW
    else:
        # Default is the WS2811_STRIP_GRB led strip type
        LED_STRIP = neopixel.ws.WS2811_STRIP_GRB

    led_data = LEDData(LED_COUNT_X, LED_COUNT_Y, LED_COUNT_E, LED_STRIP)
    font_data = FontData(led_data, selected_font)


def setup_logging():
    logging.basicConfig(level=logging.INFO)


def register_with_server(address, port):
    data = {'uuid': RPi_UUID, 'local_ip': get_ip()}
    server_endpoint = 'http://{}:{}/register'.format(address, port)
    try:
        response = requests.get(server_endpoint, params=data)
    except Exception as err:
        logging.error(str(err))
        tornado.ioloop.IOLoop.instance().add_callback(setup_remote_host_address)
        return
    if not response.status_code == 200:
        logging.info('Server unavailable.')
        tornado.ioloop.IOLoop.instance().add_callback(setup_remote_host_address)
        return
    logging.debug('Registered with server!')
    tornado.ioloop.IOLoop.instance().call_later(10, register_with_server, address, port)


def run_zeroconf():
    def on_state_changed(zeroconf, service_type, name, state_change):
        if state_change == ServiceStateChange.Added:
            info = zeroconf.get_service_info(service_type, name)
            if not info:
                return
            address = socket.inet_ntoa(info.address)
            # Thread safe!
            # http://www.tornadoweb.org/en/stable/ioloop.html#tornado.ioloop.IOLoop.add_callback
            tornado.ioloop.IOLoop.instance().add_callback(register_with_server, address, info.port)
            zeroconf.close()

    zconf = Zeroconf()
    # Spawns background thread. Do not touch zconf var. It's used in on_state_changed by another
    # thread.
    ServiceBrowser(zconf, '_tshirt-server._tcp.local.', handlers=[on_state_changed])


def setup_ini():
    global RPi_UUID, REMOTE_HOST, REMOTE_PORT
    REMOTE_HOST, REMOTE_PORT = None, None
    config = configparser.ConfigParser()
    config.read('config.ini')
    if config.has_section('device') and config.has_option('device', 'uuid'):
        RPi_UUID = config['device']['uuid']
    else:
        dev_uuid = str(uuid.uuid4())
        RPi_UUID = dev_uuid
        config['device'] = {}
        config['device']['uuid'] = dev_uuid
        with open('config.ini', 'w') as f:
            config.write(f)

    if not config.has_section('fixed_host'):
        return
    if not config.has_option('fixed_host', 'host') or not config.has_option('fixed_host', 'port'):
        return
    REMOTE_HOST = config['fixed_host']['host']
    REMOTE_PORT = config['fixed_host']['port']


def setup_favorites_handler():
    async def callback():
        async with sensors_lock:
            # After being triggered, the listed is filled in approx. 2 secs.
            if len(sensors.touched_list) < 20:
                return
            filtered_list = filter(None, sensors.touched_list)
            touches = len(list(filtered_list))
            # Reset touch mechanism.
            sensors.reset_touch_count()

        assert touches > 0
        script_name = _FAV_FILENAME_FORMAT.format(touches)
        if not os.path.exists(script_name):
            return
        async with command_handler_lock:
            command_handler.stop()
            try:
                subprocess = tornado.process.Subprocess(['sudo', 'python', script_name])
                await subprocess.wait_for_exit(raise_error=False)
            except Exception as err:
                logging.error(str(err))
            # Clean up after script is executed.
            command_handler.stop()

    loop = tornado.ioloop.PeriodicCallback(callback, 400)
    loop.start()


def setup_remote_host_address():
    if REMOTE_HOST is not None and REMOTE_PORT is not None:
        tornado.ioloop.IOLoop.instance().add_callback(register_with_server, REMOTE_HOST,
                                                      REMOTE_PORT)
    else:
        tornado.ioloop.IOLoop.instance().add_callback(run_zeroconf)


def init():
    parse_args()
    setup_logging()
    setup_ini()
    setup_favorites_handler()
    setup_remote_host_address()

    global command_handler, sensors, command_handler_lock, sensors_lock
    command_handler = CommandHandler()
    sensors = SensorHandler()
    command_handler_lock = tornado.locks.Lock()
    sensors_lock = tornado.locks.Lock()

    application = tornado.web.Application([
        (r'/identify', IdentifyHandler),
        (r'/ws', WSHandler),
    ])

    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(80)
    logging.info('Starting Tornado server')
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    init()
