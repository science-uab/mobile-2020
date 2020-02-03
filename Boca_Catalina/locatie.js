
var x = document.getElementById("id_geo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitudine: " + position.coords.latitude + 
  "<br>Longitudine: " + position.coords.longitude+
  "<br>Acuratete: "+position.coords.accuracy;
}
getLocation();