// CUSTOM BLOCKS ----------------

//Matrix -------------------------------------------------------------------------------------------------------------------------------
// Init Matrix ----------------
Blockly.Blocks['matrix_init'] = {
  init: function() {
    this.jsonInit({
  "type": "init_matrix",
  "message0": "Initialize Matrix",
  "nextStatement": null,
  "colour": 230,
  "tooltip": "Initialize matrix",
  "helpUrl": ""
    })
  }
}
Blockly.Python['matrix_init'] = function(block) {
  return 'from matrixLib import * \n'
  } 
  
// Clear Matrix ----------------
Blockly.Blocks['matrix_clear'] = {
  init: function() {
    this.jsonInit({
  "type": "matrix_clear",
  "message0": "Clear Matrix",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['matrix_clear'] = function(block) {
  return 'matrix.clearStrip() \nstrip.show() \n'
  }

// Matrix set Brightness ----------------
Blockly.Blocks['matrix_setBrightness'] = {
  init: function() {
    this.jsonInit({
  "type": "matrix_setbrightess",
  "message0": "Set brightness %% %1",
  "args0": [
    {
      "type": "input_value",
      "name": "brightness",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['matrix_setBrightness'] = function(block) {
  var brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC)
  
  return `matrix.setBrightness(${brightness}) \n`
  }

// Scroll Text ----------------
Blockly.Blocks['matrix_scrollText'] = {
  init: function() {
    this.jsonInit({
  "type": "scrolltext",
  "message0": "Scroll text %1 Text %2 Color %3",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "textStr",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "color"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['matrix_scrollText'] = function(block) {
  var textStr = Blockly.Python.valueToCode(block, 'textStr', Blockly.Python.ORDER_ATOMIC)
  var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
  
  return`matrix.setText(${textStr}) \nmatrix.setColor(${color}) \nmatrix.printString() \n`
}  

//SetPixel_xy_5x5_multiColor ----------------
Blockly.Blocks['set_XY_5x5_multiColor'] = {
  init: function() {
    this.jsonInit({
  "type": "set_xy_multicolor",
  "message0": "Set matrix 5x5 %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_00",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_01",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_02",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_03",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_04",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_10",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_11",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_12",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_13",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_14",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_20",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_21",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_22",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_23",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_24",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_30",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_31",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_32",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_33",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_34",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_40",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_41",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_42",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_43",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_44",
      "colour": "#000000"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['set_XY_5x5_multiColor'] = function(block) {
  // creats an multidimensional array with the colorinofrmation of each pixel
  // function to lead zero padding
  Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
  }
  
  var outputStr = "matrix.pixelData = ["
  for (var i = 0; i < 5; i++) {
      outputStr += "["
      
      for (var j=0; j < 5; j++){
        var color = block.getFieldValue("Pixel_" + (i*10 + j).pad(2))
        outputStr += "0x" + `${color.replace("#", "")}`
        if (j < 4){ outputStr += ","}
      }
      
    if (i < 4){ outputStr += "],"}
  }
  outputStr += "]] \n"
  outputStr += "setMatrix_5x5_array(matrix.pixelData, strip) \n"
  
  return outputStr
  }
  
//SetPixel_xy_5x5_monoColor ----------------
Blockly.Blocks['set_XY_5x5_monoColor'] = {
  init: function() {
    this.jsonInit({
  "type": "set_xy_5x5_monocolor",
  "message0": "Set matrix 5x5 %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31",
  "args0": [
    {
      "type": "field_colour",
      "name": "Color",
      "colour": "#ff0000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_00",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_01",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_02",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_03",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_04",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_10",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_11",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_12",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_13",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_14",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_20",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_21",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_22",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_23",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_24",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_30",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_31",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_32",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_33",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_34",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_40",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_41",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_42",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_43",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_44",
      "checked": false
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['set_XY_5x5_monoColor'] = function(block) {
  // creats an multidimensional array with the colorinofrmation of each pixel
  // function to lead zero padding
  Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
  }
  var color = block.getFieldValue('Color');
  var outputStr = "matrix.pixelData = ["
  
  for (var i = 0; i < 5; i++) {
      outputStr += "["
      
      for (var j=0; j < 5; j++){
       
        if ( block.getFieldValue("Pixel_" + (i*10 + j).pad(2)) == 'TRUE'){
          outputStr += "0x" + `${color.replace("#", "")}`
        }
        else{
          outputStr += "0x00"
        }
        if (j < 4){ outputStr += ","}
        
      }
      if (i < 4){ outputStr += "],"}
  }
  
  outputStr += "]] \n"
  outputStr += "setMatrix_5x5_array(matrix.pixelData, strip) \n"
  
  return outputStr
  }
  
  
//SetPixel_xy_8x8_multiColor ----------------
Blockly.Blocks['set_XY_8x8_multiColor'] = {
  init: function() {
    this.jsonInit({
  "type": "set_xy_8x8_multicolor",
  "message0": "Set matrix 8x8 %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_00",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_01",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_02",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_03",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_04",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_05",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_06",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_07",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_10",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_11",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_12",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_13",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_14",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_15",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_16",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_17",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_20",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_21",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_22",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_23",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_24",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_25",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_26",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_27",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_30",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_31",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_32",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_33",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_34",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_35",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_36",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_37",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_40",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_41",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_42",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_43",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_44",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_45",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_46",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_47",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_50",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_51",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_52",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_53",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_54",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_55",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_56",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_57",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_60",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_61",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_62",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_63",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_64",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_65",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_66",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_67",
      "colour": "#000000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_colour",
      "name": "Pixel_70",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_71",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_72",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_73",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_74",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_75",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_76",
      "colour": "#000000"
    },
    {
      "type": "field_colour",
      "name": "Pixel_77",
      "colour": "#000000"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['set_XY_8x8_multiColor'] = function(block) {
  // creats an multidimensional array with the colorinofrmation of each pixel
  // function to lead zero padding
  Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
  }
  
  var outputStr = "matrix.pixelData = ["
  
  for (var i = 0; i < 8; i++) {
      outputStr += "["
      
      for (var j=0; j < 8; j++){
        var color = block.getFieldValue("Pixel_" + (i*10 + j).pad(2))
        outputStr += "0x" + `${color.replace("#", "")}`
        if (j < 7){ outputStr += ","}
      }
      
    if (i < 7){ outputStr += "],"}
  }
  outputStr += "]] \n"
  outputStr += "setMatrix_8x8_array(matrix.pixelData, strip) \n"
  
  return outputStr
  }

//SetPixel_xy_8x8_monoColor ----------------
Blockly.Blocks['set_XY_8x8_monoColor'] = {
  init: function() {
    this.jsonInit({
  "type": "set_xy_8x8_monocolor",
  "message0": "Set matrix 8x8 %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72 %73",
  "args0": [
    {
      "type": "field_colour",
      "name": "Color",
      "colour": "#ff0000"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_00",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_01",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_02",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_03",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_04",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_05",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_06",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_07",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_10",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_11",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_12",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_13",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_14",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_15",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_16",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_17",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_20",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_21",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_22",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_23",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_24",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_25",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_26",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_27",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_30",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_31",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_32",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_33",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_34",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_35",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_36",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_37",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_40",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_41",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_42",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_43",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_44",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_45",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_46",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_47",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_50",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_51",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_52",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_53",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_54",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_55",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_56",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_57",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_60",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_61",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_62",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_63",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_64",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_65",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_66",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_67",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_70",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_71",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_72",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_73",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_74",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_75",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_76",
      "checked": false
    },
    {
      "type": "field_checkbox",
      "name": "Pixel_77",
      "checked": false
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['set_XY_8x8_monoColor'] = function(block) {
  // creats an multidimensional array with the colorinofrmation of each pixel
  // function to lead zero padding
  Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
  }
  
  var color = block.getFieldValue('Color');
  var outputStr = "matrix.pixelData = ["
  
  for (var i = 0; i < 8; i++) {
      outputStr += "["
      
      for (var j=0; j < 8; j++){
       
        if ( block.getFieldValue("Pixel_" + (i*10 + j).pad(2)) == 'TRUE'){
          outputStr += "0x" + `${color.replace("#", "")}`
        }
        else{
          outputStr += "0x00"
        }
        if (j < 7){ outputStr += ","}
        
      }
      if (i < 7){ outputStr += "],"}
  }
  
  outputStr += "]] \n"
  outputStr += "setMatrix_8x8_array(matrix.pixelData, strip) \n"
  
  return outputStr
  }
  
// Matrix set_xy_5x5_onePixel ----------------
Blockly.Blocks['set_XY_5x5_onePixel'] = {
  init: function() {
    this.jsonInit({
  "type": "set_xy_5x5_onepixel",
  "message0": "Set Pixel 5x5, %1 Position  X %2 Position  Y %3 Color %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "xPos",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "yPos",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['set_XY_5x5_onePixel'] = function(block) {
  var xPos = Blockly.Python.valueToCode(block, 'xPos', Blockly.Python.ORDER_ATOMIC)
  var yPos = Blockly.Python.valueToCode(block, 'yPos', Blockly.Python.ORDER_ATOMIC)
  var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC)
  
  return `setMatrix_5x5_x_y(${xPos}, ${yPos}, ${color}, strip) \nstrip.show() \n`
  }

// Matrix set_xy_5x5_onePixel ----------------
Blockly.Blocks['set_XY_8x8_onePixel'] = {
  init: function() {
    this.jsonInit({
  "type": "set_xy_8x8_onepixel",
  "message0": "Set Pixel 8x8, %1 Position  X %2 Position  Y %3 Color %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "xPos",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "yPos",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['set_XY_8x8_onePixel'] = function(block) {
  var xPos = Blockly.Python.valueToCode(block, 'xPos', Blockly.Python.ORDER_ATOMIC)
  var yPos = Blockly.Python.valueToCode(block, 'yPos', Blockly.Python.ORDER_ATOMIC)
  var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC)
  
  return `setMatrix_8x8_x_y(${xPos}, ${yPos}, ${color}, strip) \nstrip.show() \n`
  }
  
//MPR121 -------------------------------------------------------------------------------------------------------------------------------
// Init MPR121 ----------------
Blockly.Blocks['MPR121_init'] = {
  init: function() {
    this.jsonInit({
  "type": "init_mpr121",
  "message0": "Initialize touchsensor MPR121",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['MPR121_init'] = function(block) {
  return 'from mpr121Lib import * \n'
  } 

 //MPR121 touched ----------------
Blockly.Blocks['MPR121_touched'] = {
  init: function() {
    this.jsonInit({
  "type": "mpr121_touched",
  "message0": "If MPR121 electrode %1 is touched %2 times %3 %4",
  "args0": [
    {
      "type": "field_number",
      "name": "electrodeNumb",
      "value": 0,
      "min": 0,
      "max": 11
    },
    {
      "type": "field_number",
      "name": "xTimes",
      "value": 1,
      "min": 1,
      "max": 10
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statementInput"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['MPR121_touched'] = function(block) {
   var statements_statementinput = Blockly.Python.statementToCode(block, 'statementInput')
  
  return `${statements_statementinput}`
  } 

//MPR121 capState ---------------- 
Blockly.Blocks['MPR121_getCapState'] = {
  init: function() {
    this.jsonInit({
  "type": "mpr121_getcapstate",
  "message0": "MPR121, electrode  %1 is touched",
  "output": "Boolean",
  "args0": [
    {
      "type": "field_number",
      "name": "electrodeNumb",
      "value": 0,
      "min": 0,
      "max": 11
    }
  ],
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['MPR121_getCapState'] = function(block) {
  var electrodeNumb = block.getFieldValue('electrodeNumb')
  return [`cap.is_touched(${electrodeNumb})`, Blockly.Python.ORDER_NONE]
}

//Time -------------------------------------------------------------------------------------------------------------------------------
// Wait seconds ----------------
Blockly.Blocks['wait_sec'] = {
  init: function() {
    this.jsonInit({
  "type": "wait_sec",
  "message0": "Wait seconds %1",
  "args0": [
    {
      "type": "input_value",
      "name": "time_sec",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 270,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['wait_sec'] = function(block) {
  var time_sec = Blockly.Python.valueToCode(block, 'time_sec', Blockly.Python.ORDER_ATOMIC)
  
  return `time.sleep(${time_sec}) \n`
  } 

//Strip -------------------------------------------------------------------------------------------------------------------------------
// Init Strip ----------------
Blockly.Blocks['strip_init'] = {
  init: function() {
    this.jsonInit({
  "type": "strip_init",
  "message0": "Initialize Strip  %1 Number of LED's %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ledCount",
      "check": "Number"
    }
  ],
  "nextStatement": null,
  "colour": 165,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['strip_init'] = function(block) {
  var ledCount = Blockly.Python.valueToCode(block, 'ledCount', Blockly.Python.ORDER_ATOMIC)
  return `from stripLib import * \nLED_COUNT = ${ledCount} \nstrip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP) \nstrip.begin()\n`
  }

//Strip set brightness----------------
Blockly.Blocks['strip_setBrightness'] = {
  init: function() {
    this.jsonInit({
  "type": "strip_setbrightness",
  "message0": "Set brightness %1",
  "args0": [
    {
      "type": "input_value",
      "name": "brightness",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['strip_setBrightness'] = function(block) {
  var brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC)

  return `neoStrip.setBrightness(int(${brightness}), strip) \n`
  }
  
//Strip setPixel ----------------
Blockly.Blocks['strip_setPixel'] = {
  init: function() {
    this.jsonInit({
  "type": "strip_setpixel",
  "message0": "Set pixel pos %1 to color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "pixelPos",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['strip_setPixel'] = function(block) {
  var pixelPos = Blockly.Python.valueToCode(block, 'pixelPos', Blockly.Python.ORDER_ATOMIC)
  var color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC)
    
  return `neoStrip.setPixelColor(${pixelPos}, ${color}, strip) \nstrip.show() \n`
  }

// Clear Strip ----------------
Blockly.Blocks['strip_clear'] = {
  init: function() {
    this.jsonInit({
  "type": "clearstrip",
  "message0": "Clear strip",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 165,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['strip_clear'] = function(block) {
  return 'neoStrip.clear(strip) \n'
  }
  
//GPIO -------------------------------------------------------------------------------------------------------------------------------
// GPIO initalize ----------------
Blockly.Blocks['GPIO_init'] = {
  init: function() {
    this.jsonInit({
  "type": "gpio_init",
  "message0": "Initalize GPIO",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['GPIO_init'] = function(block) {
  
  return 'from gpioLib import * \n'
  }
  
// GPIO set Mode ----------------
Blockly.Blocks['GPIO_setMode'] = {
  init: function() {
    this.jsonInit({
  "type": "gpio_setmode",
  "message0": "Set GPIO %1 as %2",
  "args0": [
    {
      "type": "field_number",
      "name": "GPIO_pin",
      "value": 3,
      "min": 3,
      "max": 40
    },
    {
      "type": "field_dropdown",
      "name": "GPIO_mode",
      "options": [
        [
          "Output",
          "0"
        ],
        [
          "Input",
          "1"
        ],
        [
          "Input PullUp",
          "2"
        ],
        [
          "Input PullDown",
          "3"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['GPIO_setMode'] = function(block) {
  var gpioPin = block.getFieldValue('GPIO_pin')
  var gpioMode = block.getFieldValue('GPIO_mode')
  var mode = ["GPIO.OUT", "GPIO.IN", "RPIO.IN, pull_up_down=GPIO.PUD_UP", "RPIO.IN, pull_up_down=GPIO.PUD_DOWN"]
  
  var args = gpioPin + ", " + mode[Number(gpioMode)]
  
  //RPIO.setup(7, RPIO.IN, pull_up_down=RPIO.PUD_UP)
  return `GPIO.setup(${args}) \n`
  }

// GPIO set IO ----------------
Blockly.Blocks['GPIO_setIO'] = {
  init: function() {
    this.jsonInit({
  "type": "gpio_setio",
  "message0": "GPIO set pin %1 to %2",
  "args0": [
    {
      "type": "field_number",
      "name": "GPIO_pin",
      "value": 3,
      "min": 0,
      "max": 40
    },
    {
      "type": "field_dropdown",
      "name": "GPIO_set",
      "options": [
        [
          "High",
          "True"
        ],
        [
          "Low",
          "False"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['GPIO_setIO'] = function(block) {
  var gpioPin = block.getFieldValue('GPIO_pin')
  var gpioSet = block.getFieldValue('GPIO_set')
  
  return `GPIO.output(${gpioPin}, ${gpioSet}) \n`
  }
 
//Sensors, not ready yet -------------------------------------------------------------------------------------------------------------------------------
// Init touch sensor ----------------
Blockly.Blocks['init_touchSensor'] = {
  init: function() {
    this.jsonInit({
      message0: 'Initialize touch sensor',
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip:
        'Initialize touch sensor'
    })
  }
}
Blockly.Python['init_touchSensor'] = function(block) {
  return '\n# Init color sensor -------------------------- \nimport RPi.GPIO as GPIO \n# RPi.GPIO Layout verwenden(wie Pin-Nummern) \nGPIO.setmode(GPIO.BOARD) \n# Channel to which the capacitive touch sensor is connected \nelectrodeChannel = 15 \n# Set Pin 15 as Input \nGPIO.setup(electrodeChannel, GPIO.IN) \n# Add rising edge detection on a channel \nGPIO.add_event_detect(electrodeChannel, GPIO.RISING)   \n \nclass TouchSensor: \n  def millis(self): \n    return time.time() * 1000 \n \n  actTime = 0 \n  oldTime = 0 \n  sensibleTime = 2000 \n  capState = 0 \n  oldCapState = 0  \n  touchCounter = 0 \n    \ntouchSensor = TouchSensor() \n'
}

// Init mcp9808 temperature sensor ----------------
Blockly.Blocks['MCP9808_init'] = {
 init: function() {
    this.jsonInit({
  "type": "mcp9808_init",
  "message0": "Initialize MCP9808 temperature sensor",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['MCP9808_init'] = function(block) {
  return 'from mcp9808Lib import * \n'
  }

// MCP9808 get Temperature ----------------
Blockly.Blocks['MCP9808_getTemp'] = {
  init: function() {
    this.jsonInit({
  "type": "MCP9808_getTemp",
  "message0": 'Get Temperature',
  "output": "Number",
  "colour": 30,
  "tooltip": "Returns actual Temperature of temp sensor"
    })
  }
}
Blockly.Python['MCP9808_getTemp'] = function(block) {
  return ['tempSensor.get_temp()', Blockly.Python.ORDER_NONE]
}

// Init color sensor TCS34725----------------
Blockly.Blocks['TCS34725_init'] = {
  init: function() {
    this.jsonInit({
      message0: 'Initialize color sensor',
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip: 'Initialize color sensor'
    })
  }
}
Blockly.Python['TCS34725_init'] = function(block) {
  return 'from tcs34725Lib import * \n'
 }
 
// Color sensor TCS34725 get color----------------
Blockly.Blocks['TCS34725_getColor'] = {
  init: function() {
    this.jsonInit({
  "type": "tcs34725_getcolor",
  "message0": "get %1 value",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "colorType",
      "options": [
        [
          "RGB",
          "hex"
        ],
        [
          "LUX",
          "lux"
        ],
        [
          "Color Temperature",
          "temp"
        ]
      ]
    }
  ],
  "output": "Number",
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['TCS34725_getColor'] = function(block) {
  var dropdown_colortype = block.getFieldValue('colorType')
  return [`colorSensor.get_color("${dropdown_colortype}")`, Blockly.Python.ORDER_NONE]
 }

// Disable Light ----------------
Blockly.Blocks['TCS34725_disableLight'] = {
  init: function() {
    this.jsonInit({
  "type": "blocklightsensor",
  "message0": "%1 Light",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EnableLight",
      "options": [
        [
          "Enable",
          "False"
        ],
        [
          "Disable",
          "True"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}
Blockly.Python['TCS34725_disableLight'] = function(block) {
  var enableLight = block.getFieldValue('EnableLight')
  return `colorSensor.disable_light(${enableLight})\n`
}

// If touched ----------------
Blockly.Blocks['ifTouched'] = {
  init: function() {
    this.jsonInit({
  "type": "touched",
  "message0": "If touched  %1 times %2 %3",
  "args0": [
    {
      "type": "field_number",
      "name": "counter",
      "value": 0,
      "min": 0,
      "max": 5
    },
    {
      "type": "input_value",
      "name": "NAME"
    },
    {
      "type": "input_statement",
      "name": "statementInput"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 30,
  "tooltip": "",
  "helpUrl": ""
    })
  }
}

Blockly.Python['ifTouched'] = function(block) {
  var number_counter = block.getFieldValue('counter')
  var statements_input = Blockly.Python.statementToCode(block, 'statementInput');
  
  return `\ntouchSensor.actTime = touchSensor.millis() \nif (touchSensor.actTime - touchSensor.oldTime) > touchSensor.sensibleTime: \n  touchSensor.counter = 0 \nif GPIO.event_detected(electrodeChannel): \n  if touchSensor.counter == 0: \n    touchSensor.oldTime = touchSensor.actTime \n    touchSensor.counter += 1 \n  elif (touchSensor.actTime - touchSensor.oldTime) < touchSensor.sensibleTime: \n    touchSensor.counter += 1 \nif touchSensor.counter == ${number_counter}: \n${statements_input}\n`
}

//Animations, not ready yet -------------------------------------------------------------------------------------------------------------------------------
// Color Wipe ----------------
Blockly.Blocks['color_wipe'] = {
  init: function() {
    this.jsonInit({
      type: 'color_wipe',
      message0: 'Color Wipe - Red %1 Green %2 Blue %3 %4',
      args0: [
        {
          type: 'field_number',
          name: 'Red',
          value: 0,
          min: 0,
          max: 255
        },
        {
          type: 'field_number',
          name: 'Green',
          value: 0,
          min: 0,
          max: 255
        },
        {
          type: 'field_number',
          name: 'Blue',
          value: 0,
          min: 0,
          max: 255
        },
        {
          type: 'input_value',
          name: 'Color Wipe'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip: 'Select colorWipe color',
      helpUrl: ''
    })
  }
}

Blockly.Python['color_wipe'] = function(block) {
  var number_red = block.getFieldValue('Red')
  var number_green = block.getFieldValue('Green')
  var number_blue = block.getFieldValue('Blue')

  return `colorWipe(strip, Color(${number_red}, ${number_green}, ${number_blue}))\n`
}

// Theater Chase ----------------
Blockly.Blocks['theater_chase'] = {
  init: function() {
    this.jsonInit({
      type: 'theater_chase',
      message0: 'Theater Chace - Red %1 Green %2 Blue %3 %4',
      args0: [
        {
          type: 'field_number',
          name: 'Red',
          value: 0,
          min: 0,
          max: 255
        },
        {
          type: 'field_number',
          name: 'Green',
          value: 0,
          min: 0,
          max: 255
        },
        {
          type: 'field_number',
          name: 'Blue',
          value: 0,
          min: 0,
          max: 255
        },
        {
          type: 'input_value',
          name: 'Theater Chace'
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip: 'Select theaterChase color',
      helpUrl: ''
    })
  }
}

Blockly.Python['theater_chase'] = function(block) {
  var number_red = block.getFieldValue('Red')
  var number_green = block.getFieldValue('Green')
  var number_blue = block.getFieldValue('Blue')

  return `theaterChase(strip, Color(${number_red}, ${number_green}, ${number_blue}))\n`
}

// Rainbow ----------------

Blockly.Blocks['init_strip'] = {
  init: function() {
    this.jsonInit({
      message0: 'Initialise strip',
      nextStatement: null,
      colour: 30,
      tooltip:
        'Import all from smartshirt, fire Adafruit_NeoPixel and strip.begin().'
    })
  }
}

Blockly.Python['init_strip'] = function(block) {
  return [
    'from smartshirt import *\nstrip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL, LED_STRIP)\nstrip.begin()\n'
  ]
}

Blockly.Blocks['rainbow'] = {
  init: function() {
    this.jsonInit({
      message0: 'Rainbow',
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip: 'Run rainbow()'
    })
  }
}

Blockly.Python['rainbow'] = function(block) {
  return 'rainbow(strip)\n'
}

// Rainbow Cycle ----------------
Blockly.Blocks['rainbowCycle'] = {
  init: function() {
    this.jsonInit({
      message0: 'Rainbow Cycle',
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip: 'Run rainbowCycle()'
    })
  }
}

Blockly.Python['rainbowCycle'] = function(block) {
  return 'rainbowCycle(strip)\n'
}

// Theater Chase Rainbow ----------------
Blockly.Blocks['theaterChaseRainbow'] = {
  init: function() {
    this.jsonInit({
      message0: 'Theater Chace Rainbow',
      previousStatement: null,
      nextStatement: null,
      colour: 30,
      tooltip: 'Run theaterChaseRainbow()'
    })
  }
}

Blockly.Python['theaterChaseRainbow'] = function(block) {
  return 'theaterChaseRainbow(strip)\n'
}
