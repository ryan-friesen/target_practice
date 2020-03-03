function fillCanvas() {
  colorGradientCanvas();
  // imageCanvas();
  // setAttribute();
}

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

// function setAttribute() {
//   this.setAttribute("crossOrigin", "");
// }

function mouseMoveCoordinates(event) {
  let elementId = event.target.id;
  let a = getXCoords(elementId);
  let b = getYCoords(elementId);
  let x = event.clientX - a;
  let y = Math.floor(event.clientY - b);
  let coords = "X = " + x + ", Y = " + y;

  document.getElementById("mousemove-text").innerHTML = coords;
}

function colorGradientCanvas() {
  let c = document.getElementById("my-canvas");
  let ctx = c.getContext("2d");
  let grd = ctx.createLinearGradient(0, 0, 300, 0);
  grd.addColorStop(0, "white");
  grd.addColorStop(0.1, "purple");
  grd.addColorStop(0.3, "red");
  grd.addColorStop(0.5, "green");
  grd.addColorStop(0.7, "yellow");
  grd.addColorStop(0.9, "blue");
  grd.addColorStop(1, "black");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 300, 200);
}

// function imageCanvas() {
//   let canvas = document.getElementById("image-canvas"),
//     ctx = canvas.getContext("2d");
//   canvas.width = 200;
//   canvas.height = 200;

//   let background = new Image();
//   background.src = "target_practice_pics/LnRrYf6e.jpg";

//   background.onload = function() {
//     ctx.drawImage(background, 0, 0);
//   };
// }

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
  let b = document.getElementById("hex-text"),
    d = document.getElementById("color-menu").value;
  switch (d) {
    case "body":
      document.body.style.backgroundColor = "#" + b.value;
      break;
    case "text":
      document.body.style.color = "#" + b.value;
      break;
    case "menu-background":
      let a = document.getElementById("color-menu");
      a.style.backgroundColor = "#" + b.value;
      break;
    case "menu-text":
      let e = document.getElementById("color-menu");
      e.style.color = "#" + b.value;
      break;
    default:
      break;
  }
}

function getRGB(event) {
  // id variable below is set to the target element's "id" node

  let id = event.target.id,
    a = getXCoords(id),
    b = Math.floor(getYCoords(id));

  // the id node value is passed to the getXCoords() function, which returns the
  // number of pixels the event target is from the left of the parent element

  // the same is done for the number of pixels the target is located from the *top* of the
  // parent element

  // the x and y variables below grab the clientX and clientY values, and subtract the
  // returned a and b values from the results respectively

  let x = event.clientX - a,
    y = event.clientY - b;

  // the information for the canvas element is gleaned from the html file below;
  // "c" is the variable that contains all element properties

  // "d" below uses the getContext method to set context to "2d" (the other option being
  //WebGL; both have attributes that can be inputted as second param)

  let d = event.target.getContext("2d");

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
