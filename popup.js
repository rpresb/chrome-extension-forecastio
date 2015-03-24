document.addEventListener('DOMContentLoaded', function() {
	chrome.runtime.sendMessage({action: "getCurrentForecast"}, function(response) {
		console.log("callback", response);

		var statusDiv = document.getElementById("status");
		var icoImg = document.getElementById("ico");
		var temperatureDiv = document.getElementById("temperature");

		statusDiv.textContent = response.currently.summary;

		temperatureDiv.style.display = "block";
		temperatureDiv.textContent = response.currently.temperature.toString().split('.')[0] + "˚C";

		icoImg.style.display = "block";
		icoImg.src = chrome.extension.getURL("/" + response.currently.icon + ".png");

		chrome.browserAction.setIcon({
            path: "/" + response.currently.icon + ".png"
        });
	});
});
