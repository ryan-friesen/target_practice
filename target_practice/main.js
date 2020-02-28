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
  let grd = ctx.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0, "red");
  grd.addColorStop(0.5, "green");
  grd.addColorStop(1, "blue");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 200, 200);
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

function listRGBValues(value) {
  let a = document.getElementById("color-display");
  let b = document.getElementById("hex-text");
  let c = b.innerHTML.length;
  const arr = [];
  for (i = 0; i < c; i++) {
    let n = b.innerHTML.charCodeAt(i);
    if (n >= 48 && n <= 57) {
      arr.push(b.innerHTML[i]);
    }
  }
  for (i = 0; i < 7; i++) {
    arr.shift();
  }
  a.style.backgroundColor = "#" + b.innerHTML;
}

function getRGB(event) {
  let id = event.target.id;
  let a = getXCoords(id);
  let b = Math.floor(getYCoords(id));
  let x = event.clientX - a;
  let y = event.clientY - b;
  let coords = "x = " + x + ", y = " + y;
  let c = document.getElementById("my-canvas");
  let d = c.getContext("2d");
  let p = d.getImageData(x, y, 1, 1).data;
  let value = rgbToHex(p[0]) + "" + rgbToHex(p[1]) + "" + rgbToHex(p[2]);
  setMousemoveContainerBackground(value);
  let decimalValues = "Red: " + p[0] + " Green: " + p[1] + " Blue: " + p[2];
  let hexValues = rgbToHex(p[0]) + "" + rgbToHex(p[1]) + "" + rgbToHex(p[2]);
  document.getElementById("rgb-text").innerHTML = coords + " " + decimalValues;
  document.getElementById("hex-text").innerHTML = hexValues;
}
