var username, lat, lon, data, options, myVar;
const TIME_INTERVAL = 1000;
function pressed() {
	if('geolocation' in navigator) {
		//button.disabled = true;//to simulate logged in profile
		//get username from before as it is constant
		username = document.getElementById('name').value;
		//call sendData set with a particular time interval
		myVar = setInterval(sendData, TIME_INTERVAL);
		//sendData();
	}
	else {
		console.log('geolocation not available');
	}
}

//function that sends geo-data to server periodically
function sendData() {
	navigator.geolocation.getCurrentPosition((position) => {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			console.log(lat);
			data = { username, lat, lon };
			options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			};
			fetch('/api', options);
			console.log('sent');
		});
}