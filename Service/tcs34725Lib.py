import Adafruit_TCS34725

class tcsColorSensor:
  def __init__(self):
    try:
      self.sensor_tcs = Adafruit_TCS34725.TCS34725()
    except:
      print("faild to initialize color sensor")

  def get_color(self, mode = "RGB"):
    try:
      self.r, self.g, self.b, self.c = self.sensor_tcs.get_raw_data() # Read the R, G, B, C color data.
      self.color_temp = Adafruit_TCS34725.calculate_color_temperature(self.r, self.g, self.b) # Calculate color temperature using utility functions.
      self.lux = Adafruit_TCS34725.calculate_lux(self.r, self.g, self.b) # Calculate lux with another utility function.
    except:
      self.r, self.g, self.b, self.c = [-1,-1,-1,-1]
      self.color_temp  = -1
      self.lux = -1
    finally:
      if mode == "RGB": return (self.r,self.g,self.b)
      if mode == "hex": return '#%02x%02x%02x' % (self.r,self.g,self.b)
      if mode == "temp": return self.color_temp
      if mode == "lux": return self.lux

  def disable_light(self, disable = True):
    self.sensor_tcs.set_interrupt(disable)
    
colorSensor = tcsColorSensor()
colorSensor.disable_light()