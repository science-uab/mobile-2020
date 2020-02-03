x = navigator.geolocation;

  		x.getCurrentPosition(success, failure);
		
		if(navigator.geolocation)
		{
			options = {
            enableHighAccuracy: false,
            timeout: Infinity,
            maximumAge: 0
};
			
		}	
function onPositionRecived(position){
			console.log(position);
		}

		function locationNotRecived(positionError){
			console.log(positionError);
		}
function success(position)

  		{
  			var lat = position.coords.latitude;
  			var lng = position.coords.longitude;


  			var coords = new google.maps.LatLng(lat,lng);

  			var mapOptions = {

  				zoom:15,
  				center: coords,
  				mapTypeId: 'hybrid'
  			}

  			var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  			var marker = new google.maps.Marker({map:map, position:coords});	
			
		var watch = x.watchPosition(onPositionRecived,locationNotRecived);
		console.log(watch);
  		}

  		function failure()
		{
			
		}