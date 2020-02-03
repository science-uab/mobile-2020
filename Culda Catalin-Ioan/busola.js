


function deviceOrientationListener(event) {
      var alpha    = event.alpha; 
      var beta     = event.beta; 
      var gamma    = event.gamma; 

      if (typeof event.webkitCompassHeading !== "undefined") {
        alpha = event.webkitCompassHeading; 
        var heading = alpha
        document.getElementById("heading").innerHTML = heading.toFixed([0]);
      }
      else {
        
        var heading = 360 - alpha; 
        document.getElementById("heading").innerHTML = heading.toFixed([0]);
      }
      if (heading > 359 || heading < 1) { 
        document.body.style.backgroundColor = "blue";
        document.getElementById("heading").innerHTML = "Nord"; 
      }
	   else if (heading > 269 && heading < 271){ 
        document.body.style.backgroundColor = "gren";
        document.getElementById("heading").innerHTML = "Vest"; 
      } 
       else if (heading > 179 && heading < 181){ 
        document.body.style.backgroundColor = "yellow";
        document.getElementById("heading").innerHTML = "Sud"; 
      } 
      else if (heading > 89 && heading < 91){ 
        document.body.style.backgroundColor = "green";
        document.getElementById("heading").innerHTML = "Est"; 
      } 
     else { 
        document.body.style.backgroundColor = "white";
      }
    }

 if (window.DeviceOrientationAbsoluteEvent) {
      window.addEventListener("DeviceOrientationAbsoluteEvent", deviceOrientationListener);
    }
else if(window.DeviceOrientationEvent){
      window.addEventListener("deviceorientation", deviceOrientationListener);
    }
else {
      alert("Dispozitiv incompatibil!!!");
    }