var map;
var directionsDisplay;
var directionsService;
var start;
var end;


function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  start = new google.maps.LatLng(37.7699298, -122.4469157);
  end = new google.maps.LatLng(37.7683909618184, -122.51089453697205);

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.8272,
             lng: -122.2913},
    zoom: 10
  });
  directionsDisplay.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(start);
    });
  }
}

function calcRoute() {
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}
