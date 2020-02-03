

document.getElementById("id_logic").innerHTML = "Logic : 2020.02.02.0";

	var busola = document.getElementById('busola');
	
	if(window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientationabsolute', function(event) {
			
			var alpha;
			
                //pentru iOS (webkitCompassHeading - diferenta dintre viteza imprejurul axei z si Nord : directia masurata in raport cu nordul magnetic)
                if(event.webkitCompassHeading) {
					
                  alpha = event.webkitCompassHeading;
                  busola.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
				  
                }
				
                // pentru Android
                else {
					
					alpha = event.alpha;
					
					}
 
				// Rotirea imaginii
				busola.style.Transform = 'rotate(' + alpha + 'deg)'; 
                busola.style.WebkitTransform = 'rotate('+ alpha + 'deg)'; // Chrome etc. 

              }, false);
        }
    
//////////////////////////////////////////////////////////////////////

function verifica_versiune()
{
	var informatii1 = document.getElementById('id_UI');
	var informatii2 = document.getElementById('id_logic');
	alert(informatii1.innerHTML + "\n" + informatii2.innerHTML);
}

//////////////////////////////////////////////////////////////////////

function arata_coordonate()
{
	var lat_long = document.getElementById("id_geo");
	navigator.geolocation.getCurrentPosition(pozitia);
	
	function pozitia(x_y) {
		lat_long.innerHTML = "Latitudine: " + x_y.coords.latitude.toFixed(4) +" "+String.fromCharCode(176)+" N"+"<br>" 
		+" Longitudine: " + x_y.coords.longitude.toFixed(4) +" "+String.fromCharCode(176)+" E";
	}
	
}

//////////////////////////////////////////////////////////////////////

	var soare = document.getElementById("soare");
	var ziua = false;
	
	soare.addEventListener("click", function()
	{
	if(ziua)
	{
	document.getElementById("titlu").style.color = "#ffff00";
	document.getElementById("id_geo").style.color = "#ffffff";
	document.getElementById("div_busola").style.backgroundColor = "#A9A9A9";
	document.body.style.backgroundColor = "#A9A9A9";
	ziua = false;
	
	}
	else
	{
	document.getElementById("titlu").style.color = "#006400";
	document.getElementById("id_geo").style.color = "#800000";
	document.getElementById("div_busola").style.backgroundColor = "#f5f5dc";
	document.body.style.backgroundColor = "#f5f5dc";
	
	
	ziua = true;
	
	}
	
});


//////////////////////////////////////////////////////////////////////