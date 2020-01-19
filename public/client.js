window.addEventListener('DOMContentLoaded', () => {

	var button = document.getElementById('submit_button');
	const TIME_INTERVAL = 10000;//Request in every 1 second
	var lat, lon, data, options, username, myvar;
	function pressed() {
		if('geolocation' in navigator) {
			//button.disabled = true;//to simulate logged in profile
			//get username from before as it is constant
			username = document.getElementById('name').value;
			//call sendData set with a particular time interval
			myvar = setInterval(sendData, TIME_INTERVAL);
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


});
