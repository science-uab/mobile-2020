
document.addEventListener("DOMContentLoaded", function(event) {
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', function(eventData) {
    var tiltLR = eventData.gamma;
    var tiltFB = eventData.beta;
    var dir = eventData.alpha

    deviceOrientationHandler(tiltLR, tiltFB, dir);
  }, false);
} else {
  document.getElementById("notice").innerHTML = "DeviceOrientationEvent API nesuportat!"
};

    function deviceOrientationHandler(tiltLR, tiltFB, dir) {
      document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
      document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
      document.getElementById("direction").innerHTML = Math.ceil(dir);
      
      var compassDisc = document.getElementById("compassDiscImg");
      compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
      compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
      compassDisc.style.transform = "rotate("+ dir +"deg)";
    }

});
