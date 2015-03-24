var APIKEY = '6ee8de3e1a315894761e9006065cffde';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	getJSON('https://api.forecast.io/forecast/' + APIKEY + '/' + 
		latitude + ',' + longitude + '?units=si&lang=pt&exclude=minutely,hourly,daily,alerts,flags', 
		function(result) {
			chrome.browserAction.setIcon({
	            path: "/" + result.currently.icon + ".png"
	        });
		});
}

function getJSON(url, callback) {
	var x = new XMLHttpRequest();
	x.open('GET', url);
	x.responseType = 'json';
	x.onload = function() {
		callback(x.response);
	};
	x.send();
}

function showError(error) {
	var statusDiv = document.getElementById("status");

    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}


chrome.runtime.onInstalled.addListener(function() {
	chrome.alarms.create("forecast", {
       delayInMinutes: 0,
       periodInMinutes: 10
   });
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
	getLocation();
});