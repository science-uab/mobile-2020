

var canvas = document.getElementById('canvas'), ctx = canvas.getContext('2d');

//rescale canvas
canvas.width = window.innerWidth * 0.8;
canvas.height = canvas.width;

//listen for orientation event
window.addEventListener("deviceorientation", handleOrientation, true);

let startX = 0, startY = 0, lastBeta = 0, oldBeta = 0, lastGamma = 0, oldGamma = 0;

let dataWrite = {};

function handleOrientation(event) {

  //get orientation data
  lastBeta  = (event.beta + 180 + startX) / 3.6;
  lastGamma = (event.gamma + 90 + startY) / 1.8;
  oldBeta = event.beta / 3.6;
  oldGamma = event.gamma / 1.8;

  //handle orientation data
  document.getElementById("beta").innerHTML =  "beta (fowards/back): " + round(lastBeta, 2) + "%";
  document.getElementById("gamma").innerHTML = "gamma  (left/right): " + round(lastGamma, 2) + "%";

  // get context and add input listeners
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ddd";

  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.width/2);
  ctx.arc(canvas.width/2, canvas.width/2, canvas.width/2, Math.PI / 4, Math.PI * 3/4);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.width/2);
  ctx.arc(canvas.width/2, canvas.width/2, canvas.width/2, Math.PI * 5 / 4, Math.PI * 7 / 4);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#bbb";
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.beginPath();
  ctx.ellipse(canvas.width/2, canvas.width/2, canvas.width / 18, canvas.width / 18, 0, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.ellipse(lastGamma / 100 * canvas.width, lastBeta / 50 * canvas.width - canvas.width/2, 8, 8, 0, 0, 2 * Math.PI);
  ctx.fill();

}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function begin() {
  startX = oldBeta;
  startY = oldGamma;
}

function stop() {
  let event = new CustomEvent('saveOrientation', {'detail':{'beta': lastBeta, 'gama': lastGamma}})
  document.dispatchEvent(event);
}