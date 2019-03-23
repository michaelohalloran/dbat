// const path = require("path");
// const express = require("express");
// const app = express();

// app.use("/uploads", express.static("uploads"));
// app.use("/public", express.static(path.join(__dirname, 'public')));

module.exports = ({ imgUrl, top, left, text }, options = "default") => {
	console.log("module img, top, left, text: ", imgUrl, top, left, text);
	const relativePath = imgUrl.replace("\\", "/");
	console.log("options if passed: ", options);
	// const imgPath = "../uploads/genesee.jpg";
	// const imgPath = `${dirName}\\uploads/genesee.jpg`;
	// const imgPath = "file:///genesee.jpg";
	const imgPath = `file:///C:/Users/kipsa/Desktop/dbat/uploads/genesee.jpg`;
	const imgPath2 = `file:///C:/Users/kipsa/Desktop/dbat/${relativePath}`;
	console.log("dirname, imagePath, ", __dirname, imgPath);
	console.log("imgPath 2:", imgPath2);
	console.log("equal? ", imgPath === imgPath2); // slash is wrong direction on path2

	return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <style>

                    body, html {
                        height: 100%;
                        position: relative;
                        background-color: red;
                        margin: 0;
                        padding: 0;
                        background-image: url(${imgPath2});
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                    }

                    .text {
                        font-size: 30px;
                        color: lightblue;
                        background: darkgoldenrod;
                        position: absolute;
                        top: ${top}px;
                        left: ${left}px;
                        transform: translate(-50%, -50%);
                    }

                   
                </style>
            </head>
            
            <body>
                <p class="text">${text}</p>
            </body>
        </html>
    `;
};
