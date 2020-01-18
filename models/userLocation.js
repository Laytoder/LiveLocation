const mongoose = require('mongoose');
const userLocationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	latitude: Number,
	longitude: Number
});
module.exports = mongoose.model('userLocation', userLocationSchema);