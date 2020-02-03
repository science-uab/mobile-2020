document.addEventListener('resize', resizeCanvas, false);

var bubbleX = window.innerWidth / 2,
    bubbleY = window.innerHeight - 75;
var contor = 0;
var ax = 0,
    ay = 0;

function resizeCanvas() {
    var canvas = document.getElementById('myCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

function verMargine() {
    if (bubbleX < 75) bubbleX = 75;                                   //pastreaza obiectul in ecran
    if (bubbleX > window.innerWidth - 75) bubbleX = window.innerWidth - 75;
    if (bubbleY < -75)                                             //reseteaza pozitia cand obiectul iese prin partea de sus a ecranului
    {
        bubbleX = canvas.width / 2;
        bubbleY = canvas.height - 75;
    }
}

function desenare(ax, ay) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    var landscapeO = window.innerWidth / window.innerHeight > 1; //testeaza daca e in modul portret sau landscape
    if (landscapeO) {
        bubbleX += ay;
        bubbleY += ax;
    } else {
        bubbleX += ax;
        bubbleY -= ay;
    }
    console.log(bubbleX, bubbleY);

    verMargine();

    context.beginPath();
    context.arc(bubbleX, bubbleY, 75, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();


}

desenare(0, 0);

function onMotion(e) {
    var acc = e.accelerationIncludingGravity;
    ax = Math.round(acc.x * 100) / 100;
    ay = Math.round(acc.y * 100) / 100;   
    desenare(ax, ay);
}
document.addEventListener('devicemotion', onMotion);
