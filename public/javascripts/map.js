// Google Maps Variable
var map;
var directionsDisplay;
var directionsService;

// My Variable
var start;
var end;

// ===
// MAP
// ===
function initMap() {
  // Connect to Google Services.
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

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
      findShelter();
    });
  }

  function findShelter() {
    // Get shelter address.
    var address = document.getElementById("address").innerHTML;
    var url = "https://crossorigin.me/https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBbD4TnXobioui4xPnHAttFuhhagzDoijU";
    $.getJSON(url, function(data) {
      console.log(data)
      end = data.results[0].geometry.location;
      userDone();
    });
  }

  // Get direction.
  function userDone() {
    console.log(end);
    calcRoute();
  }
}


// =========
// DIRECTION
// =========

// Calculate route from start to end.
function calcRoute() {
  // Draw markers.
  var truckImage = "img/truck.png";
  var truckMarker = new google.maps.Marker({
    position: start,
    map: map,
    icon: truckImage
  });

  var womanImage = "img/tampon.png";
  var womanMarker = new google.maps.Marker({
    position: end,
    map: map,
    icon: womanImage
  });

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

// =======
// MARKERS
// =======

function getMarker() {

}
