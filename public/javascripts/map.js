var map;
var directionsDisplay;
var directionsService;
var haight;
var oceanBeach;


function initMap() {
	directionsService = new google.maps.DirectionsService();

haight = new google.maps.LatLng(37.7699298, -122.4469157);
oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
	directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
    

  });
  directionsDisplay.setMap(map);

}

function calcRoute() {
  var request = {
    origin: haight,
    destination: oceanBeach,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}