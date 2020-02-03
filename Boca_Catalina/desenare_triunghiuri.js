document.getElementById("buton_triunghiuri").addEventListener("click",desenare_triunghiuri);
var muncitor=null;
var c = document.getElementById("id_canvas");
var d = document.getElementById("id_canvas1");
var ctx = c.getContext("2d");
var dtx = d.getContext("2d");
ctx.beginPath();
dtx.beginPath();
function desenare_linie_1(x,y,u,z)
{
ctx.moveTo(x,y);
ctx.lineTo(u,z);
ctx.stroke();
dtx.moveTo(x,y);
dtx.lineTo(u,z);
dtx.stroke();
}
function desenare_triunghiuri()
{
	desenare_linie_1(0,150,0,0);
	timer_id=setInterval(desenare_linie_1,1000,0,150,300,150);
	timer_id1=setInterval(desenare_linie_1,2000,0,0,300,150);
	if(muncitor==null){
    muncitor=new Worker("criterii.js");
	muncitor.onmessage=function(e)
	{
		document.getElementById("id_cazuri_congruenta").innerHTML=e.data;
	}
	muncitor.postMessage("start_scrie");
	}
	else {
		muncitor.postMessage("start_scrie");
	}
}

