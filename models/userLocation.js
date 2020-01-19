const mongoose = require('mongoose');
const userLocationSchema = mongoose.Schema({
	name: String,
	latitude: Number,
	longitude: Number
});
module.exports =  mongoose.models.userLocation || mongoose.model('userLocation', userLocationSchema);
