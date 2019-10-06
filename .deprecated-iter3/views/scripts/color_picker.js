var colorPicker = new iro.ColorPicker(".colorPicker");

var bulb = document.getElementById("bulb");

colorPicker.on(["color:init", "color:change"], function(color){
    bulb.style.backgroundColor = color.hexString;
  });