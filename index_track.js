// Thingy:52 Web Bluetooth Minimal Example
// Copyright (C) 2019, Uri Shaked
// Released under the MIT license

var x = document.getElementById("demo");
var pos;
var lat = document.getElementById("lat");
var lng = document.getElementById("lng");
var heading = document.getElementById("heading");
var time = document.getElementById("time");
var dir = document.getElementById("dir");

function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};
function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

function startLocation() {
  if (navigator.geolocation) {
    pos = navigator.geolocation.watchPosition(showPosition, error, options);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function stopLocation() {
  if (navigator.geolocation) {
    if (pos) {
      navigator.geolocation.clearWatch(pos);
    }
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
var show = function (elem) {
	elem.style.display = 'block';
};

var hide = function (elem) {
	elem.style.display = 'none';
};

var toggle = function (elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};

// Listen for click events
document.addEventListener('click', function (event) {

	// Make sure clicked element is our toggle
	if (!event.target.classList.contains('toggle')) return;

	// Prevent default link behavior
	event.preventDefault();

	// Get the content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Toggle the content
	toggle(content);

}, false);


function showPosition(position) {
//  var dateFormat= new Date(position.timestamp);
//  var timestamp = getTimestampInSeconds();
var timestamp = Date.now();
  // console.log(timestamp);
  var dateFormat= new Date(timestamp);

  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude +
  "<br>Heading: " + position.heading +
    "<br>Timestamp: " + timestamp +
    "<br>Date: " + dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds() + "<br>" +
            "<br>lng: " + position.coords.longitude + ","+
            "lat: " + position.coords.latitude + ","+
            "time: " + timestamp + ","+
            "dir: " + "61.8" + ","+
            "heading:" + "62";

lat.innerHTML = position.coords.latitude;
lng.innerHTML = position.coords.longitude;
//console.log(position.timestamp);

time.innerHTML = timestamp;
if (position.coords.heading != null)
{ heading.innerHTML = position.coords.heading; }
else { heading.innertHTML = "62"; }
dir.innerHTML = "61.8";

//// mi serve questo
    //{"lng":18.3231221,"lat":39.9732783,"time":1672977529,"dir":61.8,"heading":62,"info":[{"key":"name", "value":"CAR1"},{"key":"temp", "value":20}]},

  console.log(position);
  getOriginalMapPosition(position);
  console.log("Date: "+ dateFormat.getDate()+
           "/"+(dateFormat.getMonth()+1)+
           "/"+dateFormat.getFullYear()+
           " "+dateFormat.getHours()+
           ":"+dateFormat.getMinutes()+
           ":"+dateFormat.getSeconds());
// update map



}
