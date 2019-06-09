const React = require("react");
// import ReactDOM from "react-dom";

const path = require("path");
// const express = require("express");
// const app = express();

// app.use("/uploads", express.static("uploads"));
// app.use("/public", express.static(path.join(__dirname, 'public')));

// 2 OPTIONS:

// 1. use direct DOM creation of spans via createElement

// 2 . try to do the mapping logic above, then use span tags in the html below

module.exports = (inputArr, options = "default") => {
	const firstObj = inputArr.slice().shift();
	console.log("inputArr: ", inputArr);
	const { imgUrl, top, left, text, fontSize, color, fontFamily } = firstObj;

	function loopSpans() {
		let spans = [];
		for (let i = 0; i < inputArr.length; i++) {
			// spans.push(`<span>${inputArr[i].text}</span>`);
			return `<span>${inputArr[i].text}</span>`;
		}
		// console.log("spans", spans);
		// return `<span>${inputArr[i].text}</span>`
		// return spans;
	}
	// const spans = inputArr.map((input) => {
	// 	console.log("input: ", input);
	// 	const { color = "black", top = "0px", left = "0px", fontSize = "16px", fontFamily, text } = input;
	// 	const style = {
	// 		color,
	// 		position: relative,
	// 		top,
	// 		left,
	// 		fontSize,
	// 		fontFamily
	// 	};
	// 	return `<span>${text}</span>`;
	// });

	// const spans = inputArr.map((input) => {
	// 	const { color = "black", top = "0px", left = "0px", fontSize = "16px", fontFamily, text } = input;
	// 	const style = {
	// 		color,
	// 		position: relative,
	// 		top,
	// 		left,
	// 		fontSize,
	// 		fontFamily
	// 	};
	// 	let s = React.createElement(
	// 		"span",
	// 		{
	// 			style: style
	// 		},
	// 		input.text
	// 	);
	// 	console.log("s: ", s);
	// 	return s;
	// });

	// console.log(
	// 	"module img, top, left, text, size, color, font: ",
	// 	imgUrl,
	// 	top,
	// 	left,
	// 	text,
	// 	fontSize,
	// 	color,
	// 	fontFamily
	// );

	// const spans = inputArr.map((input) => {
	// 	console.log("input: ", input);
	// 	const { color = "black", top = "0px", left = "0px", fontSize = "16px", fontFamily, text } = input;
	// 	const style = {
	// 		color,
	// 		position: relative,
	// 		top,
	// 		left,
	// 		fontSize,
	// 		fontFamily
	// 	};
	// 	let span = document.createElement("span");
	// 	span.style = style;
	// 	let node = document.createTextNode(text);
	// 	span.appendChild(node);
	// 	return span;
	// });

	// console.log("spans: ", spans);

	function makeSpan(htmlDoc, arr) {
		let spans = [];
		for (let i = 0; i < arr.length; i++) {
			// debugger;
			let span = htmlDoc.createElement("span");
			let node = htmlDoc.createTextNode(arr[i].text);
			span.appendChild(node);
			span.style.color = arr[i].color;
			span.style.top = arr[i].top;
			span.style.left = arr[i].left;
			span.style.fontSize = arr[i].fontSize;
			span.style.fontFamily = arr[i].fontFamily;
			// spans.push(i);
			spans.push(span);
			console.log("starting loop span and spans", spans, span);
		}
		console.log("spans inside: ", spans);
		return spans;
	}

	// const spans = makeSpan(inputArr);
	// console.log("spans: ", spans);

	// const spans = inputArr.map((input) => {
	// 	const { color, top, left, fontSize, fontFamily, text } = input;
	// 	const style = {
	// 		color,
	// 		position: relative,
	// 		top,
	// 		left,
	// 		fontSize,
	// 		fontFamily
	// 	};

	// 	return (
	// 		<div>
	// 			<span style={style}>text</span>
	// 		</div>
	// 	);
	// });
	const relativePath = imgUrl.replace("\\", "/");
	// console.log("options if passed: ", options);
	// const imgPath = "../uploads/genesee.jpg";
	// const imgPath = `${dirName}\\uploads/genesee.jpg`;
	// const imgPath = "file:///genesee.jpg";
	const imgPath = `file:///C:/Users/kipsa/Desktop/dbat/uploads/genesee.jpg`;

	const dynamicPath = path.join(__dirname, "../", "uploads");
	// console.log("dynamic path: ", dynamicPath);

	// const dynamicPath2 = __dirname.replace("\\", "/");
	// const dynamicPath = `file:///${}`
	const imgPath2 = `file:///C:/Users/kipsa/Desktop/dbat/${relativePath}`;
	// console.log("..dirname, dirname, imagePath, ", dirname, __dirname, imgPath);
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
                        color: ${color};
                        background: darkgoldenrod;
                        position: absolute;
                        top: ${top}px;
                        left: ${left}px;
                        transform: translate(-50%, -50%);
                    }

                   
                </style>
            </head>
            
			<body>
					${inputArr.map((input) => {
						return `
						<span 
							style="
								color: ${input.color}; 
								position: absolute;
								top: ${input.top}px; 
								left: ${input.left}px;
								font-size: ${input.fontSize};
								font-family: ${input.fontFamily};
							"}
							>
							${input.text}
						</span>`;
					})}
                <p class="text">${text}</p>
            </body>
        </html>
    `;
};
