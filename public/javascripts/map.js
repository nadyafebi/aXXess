// Google Maps Variable
var map;
var directionsDisplay;
var directionsService;

// My Variable
var start;
var end;
var realAddress;
var currentData;

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
    zoom: 10,

    // UI settings.
    disableDefaultUI: true,
    zoomControl: true
  });

  // Set Direction Service to map.
  directionsDisplay.setMap(map);

  // Get user location.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      findRequest();
    });
  }

  // Display requests.
  function findRequest() {
    var url = "/data";
    $.getJSON(url, function(data) {
      if (data.length < 1)
      {
        location.reload(true);
      }
      console.log(data);
      currentData = data;

      // Make marker for each element.
      data.forEach(function (element) {
        console.log("TEST");
        // Get name and address.
        var eachName = element.name;
        var eachAddress = element.location;

        // Format address.
        eachAddress = eachAddress.split(' ').join('+');

        findAddress(eachName, eachAddress)
      });
      var currentAddress = data[0].location;
      findCurrentAddress(currentAddress);
    });
  }

  // Get data from Geocoding API.
  function findCurrentAddress(address) {
    // Format address.
    address = address.split(' ').join('+');

    // Get data from Geocoding API.
    var url = "https://crossorigin.me/https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBbD4TnXobioui4xPnHAttFuhhagzDoijU";
    $.getJSON(url, function(data) {
      end = data.results[0].geometry.location;
      realAddress = data.results[0].formatted_address;

      document.getElementById("clientName").innerHTML = currentData[0].name;
      document.getElementById("clientAddress").innerHTML = realAddress;

      userDone();
    });
  }

  function findAddress(name, address) {
    // Format address.
    address = address.split(' ').join('+');

    // Get data from Geocoding API.
    var url = "https://crossorigin.me/https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBbD4TnXobioui4xPnHAttFuhhagzDoijU";
    $.getJSON(url, function(data) {
      var loc = data.results[0].geometry.location;
      var realAddress = data.results[0].formatted_address;
      drawMarkers(name, loc, realAddress);
    });
  }

  function drawMarkers(name, loc, realAddress) {
    // Make info window for user.
    var contentString = "<p><b>" + name + "</b></p> <p>" + realAddress + "</p>";
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    // Draw marker.
    var womenImage = "img/tampon.png";
    var eachMarker = new google.maps.Marker({
      position: loc,
      map: map,
      icon: womenImage
    });

    // Make marker clickable.
    eachMarker.addListener('click', function() {
      infowindow.open(map, eachMarker);
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
  // Draw marker for the truck.
  var truckImage = "img/truck.png";
  var truckMarker = new google.maps.Marker({
    position: start,
    map: map,
    icon: truckImage
  });

  // Draw marker for the user.
  var womanImage = "img/tampon.png";
  var womanMarker = new google.maps.Marker({
    position: end,
    map: map,
    icon: womanImage
  });

/*
  womanMarker.addListener('click', function() {
    infowindow.open(map, womanMarker);
  });

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
*/


  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      // Display to map.
      directionsDisplay.setDirections(result);

      // Calculate distance.
      document.getElementById("distance").innerHTML = result.routes[0].legs[0].distance.text;

      // Animate stuffs.
      $('#overlay').fadeOut("ease", function () {
        $('#complete').animate({ bottom: "2.5vh" }, "ease");
        $('#cancel').animate({ bottom: "2.5vh" }, "ease");
      });
    }
  });
}

// =======
// BUTTONS
// =======

function complete() {
  $.post("/complete", function(data, status){
  });
  setTimeout(function(){
    location.reload();
  }, 2000);
}
