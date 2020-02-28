function targetNodeName(event) {
  alert(event.target.nodeName);
}

function target(event) {
  alert(event.target);
}

function targetTagName(event) {
  let x = event.target;
  document.getElementById("target-text").innerHTML =
    "You just clicked the " + x.tagName + " element!";
}

function getXCoords(elementId) {
  let a = document.getElementById(elementId);
  let bodyCoords = a.getBoundingClientRect();
  let b = bodyCoords.left;
  return b;
}

function getYCoords(elementId) {
  let a = document.getElementById(elementId);
  let bodyCoords = a.getBoundingClientRect();
  let b = bodyCoords.top;
  return b;
}

function mouseMoveCoordinates(event) {
  let elementId = event.target.id;
  let a = getXCoords(elementId);
  let b = getYCoords(elementId);
  let x = event.clientX - a;
  let y = Math.floor(event.clientY - b);
  let coords = "X = " + x + ", Y = " + y;

  document.getElementById("mousemove-text").innerHTML = coords;
}

function fillCanvas() {
  let c = document.getElementById("my-canvas");
  let ctx = c.getContext("2d");
  let grd = ctx.createLinearGradient(0, 0, 300, 0);
  grd.addColorStop(0, "red");
  grd.addColorStop(0.5, "green");
  grd.addColorStop(1, "blue");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 300, 200);
}

function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

function setMousemoveContainerBackground(value) {
  let a = document.getElementById("mousemove-container");
  a.style.backgroundColor = "#" + value;
}

function listRGBValues() {
  let a = document.getElementById("color-display");
  let b = document.getElementById("hex-text");
  let c = b.value.length;
  // const arr = [];
  // for (i = 0; i < c; i++) {
  //   let n = b.value.charCodeAt(i);
  //   if (n >= 48 && n <= 57) {
  //     arr.push(b.value[i]);
  //   }
  // }
  // for (i = 0; i < 7; i++) {
  //   arr.shift();
  // }
  document.body.style.backgroundColor = "#" + b.value;
}

function getRGB(event) {
  // id variable below is set to the target element's "id" node

  let id = event.target.id;

  // the id node value is passed to the getXCoords() function, which returns the
  // number of pixels the event target is from the left of the parent element

  let a = getXCoords(id);

  // the same is done for the number of pixels target is located from the *top* of the
  // parent element

  let b = Math.floor(getYCoords(id));

  // the x and y variables below grab the clientX and clientY values, and subtract the
  // returned a and b values from the results respectively

  let x = event.clientX - a;
  let y = event.clientY - b;

  // the information for the canvas element is gleaned from the html file below;
  // "c" is the variable that contains all element properties

  let c = document.getElementById("my-canvas");

  // "d" below uses the getContext method to set context to "2d" (the other option being
  //WebGL; both have attributes that can be inputted as second param)

  let d = c.getContext("2d");

  // the data node of the getImageData() method returns the decimal RGB values, among other
  // things

  let p = d.getImageData(x, y, 1, 1).data;

  // the necessary array incices are passed to the "decimalValues" variable in concatenated form

  let decimalValues = "Red: " + p[0] + " Green: " + p[1] + " Blue: " + p[2];

  // the necessary array indices are passed to the rgbToHex() function one by one, then concatenated

  let hexValues = rgbToHex(p[0]) + "" + rgbToHex(p[1]) + "" + rgbToHex(p[2]);

  // "rgb-text" in the html file is then given the decimalValues variable to be displayed

  document.getElementById("rgb-text").innerHTML = decimalValues;

  // hexValues variable is then passed to the below function, which changes the background of the
  // element above the color canvas

  setMousemoveContainerBackground(hexValues);

  // the below variable is declared, which gets all the information for the "hex-text" element in the HTML file

  let hexText = document.getElementById("hex-text");

  // the innerHTML is set in concatenated form - and as an important aside, the *value* attribute of this element
  // contains the pure hexValues string, which is inputted into the rgbToHex() function to set the background
  // of the page body when the onclick event is triggered

  hexText.innerHTML = "Background: #" + hexValues;
  hexText.value = hexValues;
}
