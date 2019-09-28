require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pdf = require("html-pdf");
const mongoose = require("mongoose");
const path = require("path");
const pdfTemplate = require("./documents/index");
const { mongoURI } = require("./keys");

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

const db = mongoURI;
const Image = require("./models/Image");

app.use(cors());
app.use(express.json());

//Connect to Mongo
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log("Db connect error: ", err));

// **********************************
// ROUTES
// **********************************

// @route POST api/images
//desc: Post new image
//@access Private
app.post("/api/images", upload.single("image"), async (req, res) => {
	// res.send("POST images route");

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

// @route GET /api/images
//desc: Get all images
//@access Private
app.get("/api/images", async (req, res) => {
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
app.post("/api/pdf", (req, res) => {
	// console.log(("req body", req.body));
	try {
		// console.log(("try req body", req.body));

		pdf.create(pdfTemplate(req.body, __dirname), {}).toFile("result.pdf", (err) => {
			if (err) {
				res.status(500).send(Promise.reject());
			}
			res.status(201).send(Promise.resolve());
			//add to DB: Pdf.save().then etc.
		});
	} catch (e) {
		// console.log(("req body", req.body));

		res.status(500).json({ postPdf: e });
	}
});

app.get("/api/pdf", (req, res) => {
	try {
		res.sendFile(`${__dirname}/result.pdf`);
	} catch (e) {
		res.status(400).json({ getPdf: e });
	}
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	console.log("dirname", __dirname);

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// **********************************
//404 Handler
// **********************************
// app.use((req, res, next) => {
// 	console.log("process", process);
// 	let err = new Error("Page not found");
// 	err.status = 404;
// 	next(err);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	// console.log("process", process.env);
	console.log(`Server started on port ${PORT}`);
});
