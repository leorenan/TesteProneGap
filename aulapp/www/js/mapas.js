// JavaScript Document

function initialize() {
		  var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(-8.0377,-34.9023),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		  }
		  var map = new google.maps.Map(document.getElementById('map-canvas'),
										mapOptions);
		
		  setMarkers(map, locais);
		}
		
		var locais = [
	  		['Madalena', -8.0377,-34.9023, 1],
		  	['Shopping Recife', -8.116, -34.9050, 2],
		  	['Shopping Rio Mar', -8.0857, -34.8936, 3]
		];
		
		function setMarkers(map, locations) {
		
		  for (var i = 0; i < locations.length; i++) {
			var sede = locations[i];
			var myLatLng = new google.maps.LatLng(sede[1], sede[2]);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: sede[0],
				zIndex: sede[3]
			});
		  }
		}
		
		google.maps.event.addDomListener(window, 'load', initialize);