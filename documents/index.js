const path = require("path");
// const express = require("express");
// const app = express();

// app.use("/uploads", express.static("uploads"));
// app.use("/public", express.static(path.join(__dirname, 'public')));

module.exports = (inputArr, dirName, options = "default") => {
	const firstObj = inputArr.slice().shift();
	console.log("inputArr: ", inputArr);
	const { imgUrl, text, fontSize, color, fontFamily } = firstObj;
	let { top, left } = firstObj;
	// top = top.includes("px") ? top : "25%";
	// left = left.includes("px") ? left : "50%";
	// console.log("top: ", top);

	function loopSpans() {
		let spans = [];
		for (let i = 0; i < inputArr.length; i++) {
			// spans.push(`<span>${inputArr[i].text}</span>`);
			return `<span>${inputArr[i].text}</span>`;
		}
	}

	function convertOffset(measure, offset) {
		measure = !measure.includes("%") ? measure + "px" : offset;
		return measure;
	}

	const relativePath = imgUrl.replace("\\", "/");

	const dynamicPath = path.join(__dirname, "../", "uploads");
	console.log("dynamic path: ", dynamicPath);

	const imgPath2 = `file:///C:/Users/kipsa/Desktop/dbat/${relativePath}`;
	// console.log("..dirname, dirname, imagePath, ", dirname, __dirname, imgPath);
	console.log("passed in dirName: ", dirName);
	console.log("_dirname: ", __dirname);
	console.log("imgUrl: ", imgUrl);
	console.log("imgPath2: ", imgPath2);

	let totalPath = `file:///${dirName}/${imgUrl}`;
	totalPath = totalPath.replace(/\\/g, "/");
	console.log("totalPath: ", totalPath);

	// console.log("imgPath 2:", imgPath2);
	// console.log("equal? ", imgPath === imgPath2); // slash is wrong direction on path2

	//loop over textField objects, insert them below

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
                        margin: 0;
                        padding: 0;
					}

					@media print {
						img {
							width: 10.5in;
							height: 15in;
						}
					}
                   
                </style>
            </head>
            
			<body>

					<img src="${totalPath}" alt="Image here"/>
					${inputArr.map((input) => {
						return `
						<span 
							style="
								color: ${input.color}; 
								position: absolute;
								top: ${input.top}; 
								left: ${input.left};
								font-size: ${input.fontSize};
								font-family: ${input.fontFamily};
								transform: translate(-50%, -50%);
							"}
							>
							${input.text}
						</span>`;
					})}
            </body>
        </html>
    `;
};
