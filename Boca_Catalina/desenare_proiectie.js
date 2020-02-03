document.getElementById("buton_proiectie").addEventListener("click",desenare_proiectie);
var c = document.getElementById("id_canvas_proiectii");
var ctx = c.getContext("2d");
ctx.beginPath();
function desenare_linie(x,y,u,z)
{
ctx.moveTo(x,y);
ctx.lineTo(u,z);
ctx.stroke();
}
function desenare_proiectie()
{
	desenare_linie(90,40,50,90);
	timer_id=setInterval(desenare_linie,1000,50,90,200,90);
	timerid1=setInterval(desenare_linie,2000,200,90,240,40);
	timer_id2=setInterval(desenare_linie,3000,240,40,90,40);
	timer_id3=setInterval(desenare_linie,4000,150,0,150,70);
}
