import time
from neopixel import *
from font import font

#Initialize WS2812 LED's
LED_COUNT_X    = 16
LED_COUNT_Y    = 16
LED_COUNT_E    = 0

LED_COUNT_X_E  = LED_COUNT_X + LED_COUNT_E
LED_COUNT_X_1  = LED_COUNT_X - 1
LED_COUNT_Y_1  = LED_COUNT_Y - 1
LED_COUNT      = LED_COUNT_X * (LED_COUNT_Y + LED_COUNT_E)      # Total LED pixels on the stripe.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 5       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 150    # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53


# default is the WS2811_STRIP_GRB led strip type
LED_STRIP = ws.WS2811_STRIP_GRB   # Strip type ws2811 and colour ordering

# default is the setup of 8x12
font = font("8x12")

# Font configuration:
FONT_TUPLE_X   = 0       # Font tuple index for font x dimentions.
FONT_TUPLE_Y   = 1       # Font tuple index for font y dimentions.
FONT_TUPLE_CH  = 2       # Font tuple index for character data table.

FONT_SPACE_X   = 1       # Font character spacing pixels in x direction.
FONT_OFFSET_X  = font[FONT_TUPLE_X] + FONT_SPACE_X       	# Font offset between characters in LED pixels in x direction.
FONT_OFFSET_Y  = (LED_COUNT_Y - font[FONT_TUPLE_Y]) // 2	# Font offset from top of matrix in LED pixels in y direction.

class NeoPixelHandler:
    actTime = 0
    oldTime = 0
    message = ""
    
    i = FONT_OFFSET_X
    
    Red = 100
    Blue = 0
    Green = 0
    color = Color(50, 50, 0)
    
    pixelData = 0

    def __init__(self):
        print ("NeopixelHandler started")
        self.setBrightness(20)
    
    def setPixelmod(self, x, y, color, strip):
        Pos = 0
        if (x in range(0, LED_COUNT_X)) and (y in range(FONT_OFFSET_Y, FONT_OFFSET_Y + LED_COUNT_Y)):
            if y%2:     #odd y lines
                Pos =  (LED_COUNT_Y_1 - y) * LED_COUNT_X_E + x	# stripe starts at bottom right (from front)
            else:       #even y lines
                Pos =  (LED_COUNT_Y_1 - y) * LED_COUNT_X_E + LED_COUNT_X_1 - x	# stripe starts at bottom right (from front)
            strip.setPixelColor(Pos, color)
    
    def setPixel(self, x, y, color, strip):
        Pos = 0
        if (x in range(0,16)) and (y in range(0,16)):
            if y%2:
                Pos = ((y + 1) * 16) - x - 1
            else:
                Pos = (y * 16) + x
            strip.setPixelColor(Pos, color)

    def drawChar(self, char, xPos, yPos):
        charNumb = ord(char) - 32
        charPos = 0

        for x in range(font[FONT_TUPLE_X]):	# loop over x direction
            for y in range(font[FONT_TUPLE_Y]):	# loop over y direction
                charPos = (charNumb * font[FONT_TUPLE_X]) + x	# character position in font table
                if font[FONT_TUPLE_CH][charPos] & 1<<y:
                    self.color = Color(self.Red, self.Green, self.Blue)
                    matrix.setPixelmod(x + xPos, y + yPos, self.color, strip)

    def printString(self):
        messageList = list(self.message)
        messageLength = len(messageList)

        self.actTime = time.time() * 1000
        if (self.actTime - self.oldTime) > 150:
            self.oldTime = self.actTime
            self.clearStrip()
            if self.i in range((-(FONT_OFFSET_X)) * messageLength, FONT_OFFSET_X + 1):
                for j in range(0,messageLength):
                    self.drawChar(messageList[j], self.i + (j * FONT_OFFSET_X), FONT_OFFSET_Y)
                strip.show()
                self.i -= 1
            else:
                self.i = FONT_OFFSET_X

    def clearStrip(self):
        for i in range(strip.numPixels()):
            strip.setPixelColor(i, Color(0, 0, 0))
        
    def setBrightness(self, val):
        brightness = int(val * 2.55)
        # limit max brightness to prevent pi from getting shot down
        if(brightness > 35): brightness = 35
        strip.setBrightness(brightness)

    def setColor(self, color, val):
        val = val if val > 0 else 0
        val = val if val != '' else 0
        val = int(val*2.55)
        
        setattr(matrix, color, val)
        
    def setColor(self, colorStr = "ff0000"):
        if(isinstance(colorStr, str)):
            colorStr = colorStr.replace("'", "")
            colorStr = colorStr.replace("#", "")
        
        self.rStr = colorStr[0] + colorStr[1]
        self.gStr = colorStr[2] + colorStr[3]
        self.bStr = colorStr [4] + colorStr[5]
        
        setattr(matrix, "Red", int(self.rStr, 16))
        setattr(matrix, "Green", int(self.gStr, 16))
        setattr(matrix, "Blue", int(self.bStr, 16))

    def setText(self, val):
        for ch in val:
            chVal = (ord(ch))
            # check if current character is not on font table
            if ((chVal - 32) > (len(font[FONT_TUPLE_CH]) / font[FONT_TUPLE_X])):
                # check for different special chars in German Language and replace them
                if ((192 <= chVal) and (chVal <= 198)):
                    newCh = 'A'
                elif ((200 <= chVal) and (chVal <= 203)):
                    newCh = 'E'
                elif ((210 <= chVal) and (chVal <= 214)):
                    newCh = 'O'
                elif ((217 <= chVal) and (chVal <= 220)):
                    newCh = 'U'
                elif ((224 <= chVal) and (chVal <= 230)):
                    newCh = 'a'
                elif ((232 <= chVal) and (chVal <= 235)):
                    newCh = 'e'
                elif ((242 <= chVal) and (chVal <= 246)):
                    newCh = 'o'
                elif ((249 <= chVal) and (chVal <= 252)):
                    newCh = 'u'
                else:
                    newCh = '_'  # all unknown characters

                val = val.replace(ch, newCh)
        matrix.message = val

def setMatrix_5x5_x_y(xPos, yPos, color, strip):
    #check if color is a string, format from bloxkly is '#ff00ff
    if(isinstance(color, str)):
        color = color.replace("'", "")
        color = color.replace("#", "")
        color = int(color, 16)

    for i in range(3):
        for j in range(3):
            matrix.setPixel(xPos*3 + i, yPos*3 + j, color, strip)

def setMatrix_8x8_x_y(xPos, yPos, color, strip):
    #check if color is a string, format from bloxkly is '#ff00ff
    if(isinstance(color, str)):
        color = color.replace("'", "")
        color = color.replace("#", "")
        color = int(color, 16)

    for i in range(2):
        for j in range(2):
            matrix.setPixel(xPos*2 + i, yPos*2 + j, color, strip)
            
def setMatrix_5x5_array(pixelData, strip):
    matrix.clearStrip()
    for y, row in enumerate(reversed(pixelData)):
        for x, color in enumerate(row):
            setMatrix_5x5_x_y(x, y, color, strip)
    strip.show()
            
def setMatrix_8x8_array(pixelData, strip):
    matrix.clearStrip()
    for y, row in enumerate(reversed(pixelData)):
        for x, color in enumerate(row):
            setMatrix_8x8_x_y(x, y, color, strip)
    strip.show()
    
strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)
strip.begin() # Intialize the library (must be called once before other functions).
            
matrix = NeoPixelHandler()
matrix.clearStrip()
strip.show()