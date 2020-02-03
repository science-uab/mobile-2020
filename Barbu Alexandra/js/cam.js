document.getElementById("id_button").addEventListener("click", start );
document.getElementById("id_video").addEventListener("touchstart", on_touch);
document.getElementById("id_video").addEventListener("mousedown", on_touch);
document.getElementById("myCanvas").addEventListener("click", start );

function on_success(e)
{
	document.getElementById("id_video").srcObject = e;
}
//----------------------------
function on_failure(e)
{
	alert("cannot read camera");
}
//-------------------
function start()
{
	var c = {audio:true, video: {facingMode:"environment"}};
	navigator.mediaDevices.getUserMedia(c).then(on_success).catch(on_failure);
}
//----------------------
function on_touch(e)
{
	var canvas = document.getElementById("id_canvas");
	var context = canvas.getContext("2d");
	var video =document.getElementById("id_video");
	context.drawImage(video, 0, 0);
}

//--------------------------------
function myCanvas() {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var img = document.getElementById("med");
  ctx.drawImage(img,10,10);
}


//--------------------------------
var myVideo = document.getElementById("id_video"); 

function makeBig() { 
    myVideo.width = 500; 
	myVideo.height = 500 ;
} 

function makeSmall() { 
    myVideo.width = 150;
	myVideo.height = 150;	
} 

function makeNormal() { 
    myVideo.width = 250; 
	myVideo.height = 300;
} 



//--------------------------
var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
