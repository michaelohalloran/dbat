require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const db = require("./config/keys").mongoURI;
const Image = require("./models/Image");

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//Connect to Mongo
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log("Db connect error: ", err));

// **********************************
// ROUTES
// **********************************

app.get("/", (req, res) => {
	res.send("Testing get route");
});

// @route POST /images
//desc: Post new image
//@access Private
app.post("/images", (req, res) => {
	res.send("POST images route");
	// //add image
	// try {
	//     const newImg = new Image({
	// image: req.body
	// });
	//     await newImg.save();
	//      return res.status(201).send(newImg);
	// }
	// catch(e) {
	//     return res.status(500).send('Cannot post error: ', e);
	// }
});

// @route GET /images
//desc: Get all images
//@access Private
app.get("/images", async (req, res) => {
	res.send("Images GET route");

	// //retrieve images
	// try {
	//     const imgs = await Image.find({});
	//     if (!imgs) {
	//         return res.status(400).json({message: 'Images not found'});
	//     }
	//     return res.status(200).send(imgs);
	// }
	// catch(e) {
	//     res.status(500).send(e);
	// }
});

// **********************************
//404 Handler
// **********************************
app.use((req, res, next) => {
	let err = new Error("Page not found");
	err.status = 404;
	next(err);
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
