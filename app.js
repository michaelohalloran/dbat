require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const mongoose = require("mongoose");
const path = require("path");
const pdfTemplate = require("./documents/index");

//make image uploads folder accessible publicly
app.use("/uploads", express.static("uploads"));

const multer = require("multer");
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	const isAcceptedImageType = [ "image/jpeg", "image/png", "image/jpg", "image/svg" ].includes(file.mimetype);
	if (isAcceptedImageType) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({ storage, fileFilter });

const db = require("./config/keys").mongoURI;
const Image = require("./models/Image");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.post("/images", upload.single("image"), async (req, res) => {
	// res.send("POST images route");

	console.log("incoming POST req.file: ", req.file);
	// //add image
	try {
		const newImg = new Image({
			image: req.file.path
		});
		const savedImg = await newImg.save();
		return res.status(201).send(savedImg);
	} catch (e) {
		return res.status(400).send("Cannot post image: ", e);
	}
});

// @route GET /images
//desc: Get all images
//@access Private
app.get("/images", async (req, res) => {
	// res.send("Images GET route");

	// //retrieve images
	try {
		const imgs = await Image.find();
		if (!imgs) {
			return res.status(400).json({ message: "Images not found" });
		}
		return res.status(200).send(imgs);
	} catch (e) {
		res.status(500).send(e);
	}
});

// ********************************
// PDF ROUTES
// ********************************
app.post("/pdf", (req, res) => {
	console.log(("req body", req.body));
	const options = {
		height: "10in",
		width: "7in"
	};
	try {
		pdf.create(pdfTemplate(req.body, __dirname), {}).toFile("result.pdf", (err) => {
			if (err) {
				res.status(500).send(Promise.reject());
			}
			res.status(201).send(Promise.resolve());
			//add to DB: Pdf.save().then etc.
		});
	} catch (e) {
		res.status(500).json({ postPdf: e });
	}
});

app.get("/pdf", (req, res) => {
	try {
		res.sendFile(`${__dirname}/result.pdf`);
	} catch (e) {
		res.status(400).json({ getPdf: e });
	}
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
