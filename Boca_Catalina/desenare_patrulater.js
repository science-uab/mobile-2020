document.getElementById("buton_patrulater").addEventListener("click",desenare_patrulater);
var p=document.getElementById("id_canvas2");
var ptx=p.getContext("2d");
ptx.beginPath();
function desenare_linie(x,y,u,z)
{
ptx.moveTo(x,y);
ptx.lineTo(u,z);
ptx.stroke();
}
function desenare_patrulater()
{
	desenare_linie(50,140,90,20);
	timer_id=setInterval(desenare_linie,1000,50,140,200,140);
	timerid1=setInterval(desenare_linie,2000,200,140,240,20);
	timer_id2=setInterval(desenare_linie,3000,240,20,90,20);
}