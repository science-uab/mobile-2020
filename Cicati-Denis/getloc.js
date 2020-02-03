var map, infoWindow;
var Markers = {};
	   var locations = [
		 [
				'Cluj-Napoca',
				'<strong>USAMV Cluj-Napoca</strong><p>Universitatea de Stiinte Agricole si Medicina Veterinara</p><br><a href="https://www.usamvcluj.ro">www.usamvcluj.ro</a>',
				46.75944,
				23.57083,
				0
		],
		[
			   'Brasov',
			   '<strong>Universitatea Transilvania</strong><p>Universitatea Transilvania</p><br><a href="https://www.unitbv.ro/">www.unitbv.ro/</a>',
			   45.65500000,
			   25.59666667,
				1
		],
		[
			'Alba',
		    '<strong>Universitatea 1 Decembrie 1918</strong><p>Universitatea 1 Decembrie 1918</p><br><a href="https://uab.ro">uab.ro</a>',
			   46.0691,
			   23.5725,
				  2
		]
	   ];
	   function initMap() {
		var options = {
			zoom : 13,
			center: {lat: 48.8701925, lng: 2.322897600000033}
		}
		// new map
		var map = new
	   google.maps.Map(document.getElementById('map'), options);   

	   infowindow = new google.maps.InfoWindow();  

	   if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		  };
		  map.setCenter(pos);
		}, function() {
		});
	  } else {
	  }

   for(i=0; i<locations.length; i++) {
	var position = new google.maps.LatLng(locations[i][2], locations[i][3]);
	  var marker = new google.maps.Marker({
		position: position,
		map: map,
	});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		  return function() {
			infowindow.setContent(locations[i][1]);
			infowindow.setOptions({maxWidth: 200});
			infowindow.open(map, marker);
		}
	}) (marker, i));
	Markers[locations[i][4]] = marker;
}

	google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
	return function() {
	   infowindow.setContent(content);
	   infowindow.open(map,marker);
	};
})(marker,content,infowindow));}

function locate(marker_id) {
  var myMarker = Markers[marker_id];
  var markerPosition = myMarker.getPosition();
  map.setCenter(markerPosition);
  google.maps.event.trigger(myMarker, 'click');
}


