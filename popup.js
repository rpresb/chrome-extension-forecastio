var APIKEY = '6ee8de3e1a315894761e9006065cffde';

function getLocation() {
	var statusDiv = document.getElementById("status");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        statusDiv.textContent = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	getJSON('https://api.forecast.io/forecast/' + APIKEY + '/' + 
		latitude + ',' + longitude + '?units=si&lang=pt&exclude=minutely,hourly,daily,alerts,flags', 
		function(result) {
			var statusDiv = document.getElementById("status");
			var icoImg = document.getElementById("ico");
			var temperatureDiv = document.getElementById("temperature");

			statusDiv.textContent = result.currently.summary;

			temperatureDiv.style.display = "block";
			temperatureDiv.textContent = result.currently.temperature.toString().split('.')[0] + "˚C";

			icoImg.style.display = "block";
			icoImg.src = chrome.extension.getURL("/" + result.currently.icon + ".png");

			chrome.browserAction.setIcon({
	            path: "/" + result.currently.icon + ".png"
	        });
		});
}

function showError(error) {
	var statusDiv = document.getElementById("status");

    switch(error.code) {
        case error.PERMISSION_DENIED:
            statusDiv.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            statusDiv.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            statusDiv.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            statusDiv.innerHTML = "An unknown error occurred."
            break;
    }
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

document.addEventListener('DOMContentLoaded', function() {
	getLocation();
});
