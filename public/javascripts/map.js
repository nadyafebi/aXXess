// Google Maps Variable
var map;
var directionsDisplay;
var directionsService;

// My Variable
var start;
var end;

function initMap() {
  // Connect to Google Services.
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // Default position.
  start = new google.maps.LatLng(37.7699298, -122.4469157);
  end = new google.maps.LatLng(37.7683909618184, -122.51089453697205);

  // Create the map.
  map = new google.maps.Map(document.getElementById('map'), {
    // Center at SF Bay Area.
    center: {lat: 37.8272, lng: -122.2913},
    zoom: 10
  });

  // Set Direction Service to map.
  directionsDisplay.setMap(map);

  // Get user location.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    });
  }
}

// Calculate route from start to end.
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
