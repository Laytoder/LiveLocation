const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
mongoose.connect(config.database,
 {useNewUrlParser: true, useUnifiedTopology:true,useFindAndModify: false});
let UserLocation = require('./models/userLocation');
const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
app.use(express.static('public'));
app.use(express.json());


//db connection management
let db = mongoose.connection;
db.once('open', ()=> {
  console.log('connection success DB');
});
db.on('error', (err)=> {
  console.log(err);
});



//handling entry and updation of user location requests
app.post('/api', (req, res) => {
	//reading the request
	const username = req.body.username;
	const lat = req.body.lat;
	const lon = req.body.lon;
	//checking if username exists in UserLocation model
	UserLocation.findOne({ name : username }, (err, foundObject) => {
		if(err)
			console.log(err);
		else if(!foundObject) {
			//create new entry
			const userLocation = new UserLocation({
				//_id: new mongoose.Types.ObjectId(), #you dont need this!
				name: username,
				latitude: lat,
				longitude: lon
			});
			//save new entry
			userLocation.save().then(res => {
				//console.log(res);
			}).catch(err => {
				console.log(err);
			});
			console.log('added');
		}
		else {
			//Update existing clients location
			foundObject.latitude = lat;
			foundObject.longitude = lon;
			//save changes
			foundObject.save().then(res => {
				//console.log(res);
			}).catch(err => {
				console.log(err);
			});
			console.log('updated');
		}
	});
});
