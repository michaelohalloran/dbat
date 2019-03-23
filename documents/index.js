const path = require("path");
const express = require("express");
const app = express();

app.use("/uploads", express.static("uploads"));
// app.use("/public", express.static(path.join(__dirname, 'public')));

module.exports = ({ imgUrl, top, left, text }, dirName) => {
	console.log("module img, top, left, text: ", imgUrl, top, left, text);
	// const imgPath = "../uploads/genesee.jpg";
	const imgPath = `${dirName}\\uploads/genesee.jpg`;
	console.log("dirname, passed dirname imagePath, ", __dirname, dirName, imgPath);

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
                        background-image: url(${imgPath});
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                    }

                    img {
                        height: 200px,
                        width: 200px;
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
                <img src=${imgPath} alt=${imgPath}/>
                <img src="/genesee.jpg" alt="some text"/>
                <img src="genesee.jpg" alt="some text2"/>
                <img src="C:/Users/kipsa/Desktop/dbat/uploads/genesee.jpg" alt="some text3"/>
            </body>
        </html>
    `;
};
