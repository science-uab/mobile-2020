document.getElementById("buton_desenare").addEventListener("click",desenare_unghi);
var c = document.getElementById("id_canvas");
var ctx = c.getContext("2d");
ctx.beginPath();
function desenare_linie_1(x,y)
{
ctx.moveTo(0,150);
ctx.lineTo(x,y);
ctx.stroke();
}
function desenare_unghi()
{
	desenare_linie_1(0,0);
	timer_id=setInterval(desenare_linie_1,1000,300,150);
	timer_id1=setInterval(desenare_linie_1,2000,300,0);
	//clearInterval(timer_id);
	//clearInterval(timer_id1);
}
