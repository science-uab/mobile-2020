document.getElementById("buton_cerc").addEventListener("click",desenare_cercuri);
var cerc=document.getElementById("id_canvas3");
var cercctx=cerc.getContext("2d");
cercctx.beginPath();
function deseneaza_cerc(raza)
{
cercctx.arc(100, 75, raza, 0, 2 * Math.PI);
cercctx.stroke();
}
function desenare_cercuri()
{
	deseneaza_cerc(70);
	timer_id=setInterval(deseneaza_cerc,1000,50);
	timerid1=setInterval(deseneaza_cerc,2000,30);
	timer_id2=setInterval(desenare_linie,3000,10);
}