import time
from neopixel import *
from font import font

LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 5       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 150    # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

# default is the WS2811_STRIP_GRB led strip type
LED_STRIP = ws.WS2811_STRIP_GRB   # Strip type ws2811 and colour ordering

class NeoPixelStrip():
    def clear(self, strip):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(0, 0, 0))
        strip.show()
    
    def setPixelColor(self, ledPos, color, strip):
        #check if color is a string, format from bloxkly is '#ff00ff
        if(isinstance(color, str)):
            color = color.replace("'", "")
            color = color.replace("#", "")
            color = int(color, 16)
        strip.setPixelColor(ledPos, color)
        
    def setBrightness(self, val, strip):
        brightness = int(val * 2.55)
        # limit max brightness to prevent pi from getting shot down
        if(brightness > 75): brightness = 75
        strip.setBrightness(brightness)
        
neoStrip = NeoPixelStrip()
                


