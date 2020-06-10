import Adafruit_MCP9808.MCP9808 as MCP9808

class temperatureSensor:
  def __init__(self):
    try:
      self.sensor = MCP9808.MCP9808() # Start Temp Sensor
      self.sensor.begin() # Initialize
    except:
      print("failed to initialize temp sensor")

  def get_temp(self):
    try:
      self.temp = self.sensor.readTempC()
    except:
      self.temp = -1
    finally:
      print(self.temp)
      return self.temp

tempSensor = temperatureSensor()
