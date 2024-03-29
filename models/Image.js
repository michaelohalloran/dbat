const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	image: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
