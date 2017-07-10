var my_script = document.createElement('script');
my_script.setAttribute('src','https://maps.googleapis.com/maps/api/js?key=' + config.GOOGLE_API_KEY + '&callback=initMap');
document.head.appendChild(my_script);
