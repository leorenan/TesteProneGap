	
var watchID;

function startWatch() {
  var locOptions = {
    frequency : 3000,
    timeout : 5000,
    enableHighAccuracy : true
  };
  //get the current location
  watchID = navigator.geolocation.watchPosition(onLocationSuccess, onLocationError, locOptions);
}

function onLocationSuccess(loc) {
  alert("onLocationSuccess");
  //Calculate distance
  var myLatlng = new google.maps.LatLng(loc.latitude, loc.longitude);
  var mapOptions = {
	zoom: 15,
	center: myLatlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  //Calculate heading

  //Update the page

}

function onLocationError(e) {
  alert("Error: #" + e.code + "\n" + e.message);
}

function cancelWatch() {
  if(watchID != null) {
    //Clear the watch
    navigator.geolocation.clearWatch(watchID);
    //Let the user know we cleared the watch
    alert("Watch Cancelled");
    //Clear the watch ID in case someone clicks the button
    // again
    watchID = null;
  } else {
    //No watch to clear, so tell the user
    alert("No watch to cancel.");
  }
}