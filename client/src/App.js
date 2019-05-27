import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";
import Stock from "./Stock";
import { API_BASE_URL } from "./config/config";
import PdfHandler from "./PdfHandler";
import FontControls from "./InputControls";
import InputControls from "./InputControls";

class App extends Component {
	constructor() {
		super();

		this.state = {
			imgs: [],
			inputFields: [],
			text: "",
			selectedImg: null,
			textLeft: "",
			textTop: "",
			singleImg: "",
			uploadedFile: "",
			uploadUrl: "",
			pdfObj: {
				imgUrl: "",
				top: "",
				left: "",
				text: "",
				fontSize: "",
				color: "",
				fontFamily: ""
			}
		};

		this.spanRef = React.createRef();
		this.spanContainer = React.createRef();
		this.imageRef = React.createRef();
	}

	loadImages = async () => {
		let response = await axios.get(`${API_BASE_URL}/images`);
		let imgsArr = response.data.reduce((imgs, nextImgObj) => {
			imgs.push({
				id: nextImgObj._id,
				url: nextImgObj.image,
				selected: false
			});
			return imgs;
		}, []);

		this.setState({
			imgs: [ ...imgsArr ]
		});
	};

	componentDidMount() {
		//make API call, load images, also set default (as callback to loadImages, after setting state)
		this.loadImages();
	}

	setDefaultLargeImg = () => {
		const { imgs } = this.state;
		let randomIdx = Math.floor(Math.random() * imgs.length);
		let largeImg = imgs[randomIdx];
		this.setState({ selectedImg: largeImg });
	};

	setSelectedImg = (img) => {
		// img.url = img.url.slice(0,-7) + '480x480';
		this.setState({ selectedImg: img });
	};

	setImgPosition = (e) => {
		// this.setState(
		// 	{
		// 		textLeft: `${e.pageX}px`,
		// 		textTop: `${e.pageY}px`
		// 	},
		// 	() => {
		// 		this.spanRef.current.style.top = this.state.textTop;
		// 		this.spanRef.current.style.left = this.state.textLeft;
		// 	}
		// );
	};

	onDragStart = (e) => {
		// let typedText = e.target.textContent;
		// e.dataTransfer.setData("text", typedText);
		// this.setState({
		// 	startedDrag: true
		// });
		// setTimeout(() => {
		// 	this.setState({ makeInvisible: true });
		// }, 0);
	};

	onDragEnd = (e) => {
		// console.log("dragEnd evt: ", e);
		const { text, selectedImg } = this.state;
		console.log("state in dragEnd: ", this.state);
		const screen = { x: e.screenX, y: e.screenY };
		const client = { x: e.clientX, y: e.clientY };
		const page = { x: e.pageX, y: e.pageY };
		const coords = [
			[ "screen", screen.x, screen.y ],
			[ "client", client.x, client.y ],
			[ "page", page.x, page.y ]
		];
		console.table(coords);
		console.log(
			"spanContainer div left, top: ",
			this.spanContainer.current.offsetLeft,
			this.spanContainer.current.offsetTop
		);
		console.log("spanRef text left, top: ", this.spanRef.current.offsetLeft, this.spanRef.current.offsetTop);
		console.log("imageRef left, top: ", this.imageRef.current.offsetLeft, this.imageRef.current.offsetTop);
		console.log("clientX - offsetLeft: ", e.clientX - this.imageRef.current.offsetLeft);
		console.log("clientY - offsetTop: ", e.clientY - this.imageRef.current.offsetTop);
		// console.log("imageRef style: ", this.imageRef.current.style);
		// console.log("imageRef offset: ", this.imageRef.current.style.offset);
		// console.log("imageRef offset distance: ", this.imageRef.current.style.offsetDistance);
		// console.log("imageRef object position: ", this.imageRef.current.style.objectPosition);
		// console.log("imageRef style offsetPath: ", this.imageRef.current.style.offsetPath);
		// console.log(
		// 	"imageRef style page, rx, ry: ",
		// 	this.imageRef.current.style.page,
		// 	this.imageRef.current.style.rx,
		// 	this.imageRef.current.style.ry
		// );
		// console.log("imageRef style top, left: ", this.imageRef.current.style.top, this.imageRef.current.style.left);
		// console.log(
		// 	"imageRef style bottom, right: ",
		// 	this.imageRef.current.style.bottom,
		// 	this.imageRef.current.style.right
		// );
		// console.log("imageRef style x, y: ", this.imageRef.current.style.x, this.imageRef.current.style.y);
		// console.log(
		// 	"imageRef style page, cursor, cx, cy: ",
		// 	this.imageRef.current.style.cursor,
		// 	this.imageRef.current.style.cx,
		// 	this.imageRef.current.style.cy
		// );

		//********* */ currently image is 500px too far to left, top height is correct
		//find imageRef's position using pageX, make them work relative to each other
		this.setState({
			// startedDrag: false,
			// makeInvisible: false,
			pdfObj: {
				top: e.clientY,
				left: e.clientX,
				text,
				imgUrl: selectedImg.url
			},
			textLeft: `${e.pageX}px`,
			textTop: `${e.pageY}px`
		});
	};

	toggleSelected = (image) => {
		const { imgs } = this.state;
		//locate this img in the array
		let selected = imgs.find((img) => img.id === image.id);
		//toggle its selected prop, then replace it
		selected.selected = !selected.selected;
		let replaceIdx = imgs.indexOf(selected);
		let newImgs = [ ...imgs.slice(0, replaceIdx), selected, ...imgs.slice(replaceIdx + 1) ];
		this.setState({
			imgs: newImgs
		});
		this.setSelectedImg(selected);
	};

	displayLargeImg = (img) => {
		//toggle selected property to true
		this.toggleSelected(img);
		//this should then setState of selectedImg to be whichever img has selected = true
		//we then display that
	};

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	setInputField = (styleObject) => {
		console.log("style object: ", styleObject);
		this.setState({
			pdfObj: {
				color: styleObject.color,
				fontSize: styleObject.size,
				fontFamily: styleObject.font
			}
		});
	};

	addInputObject = (newInput) => {
		this.setState({
			inputFields: [ ...this.state.inputFields, newInput ]
		});
	};

	handleUpload = (e) => {
		e.preventDefault();
		console.log("E.target.files:", e.target.files[0]);
		const reader = new FileReader();
		const file = e.target.files[0];
		reader.onloadend = () => {
			this.setState({
				uploadedFile: file,
				uploadUrl: reader.result
			});
		};

		reader.readAsDataURL(file);
	};

	onUpload = (e) => {
		e.preventDefault();
		// console.log("updloaded file, updloadUrl: ", this.state.uploadedFile, this.state.uploadUrl);

		const fd = new FormData();
		fd.append("image", this.state.uploadedFile, this.state.uploadedFile.name);
		axios.post(`${API_BASE_URL}/images`, fd).then((res) => {
			console.log("DB response: ", res);
			//fetch images from DB
			this.loadImages();
		});
	};

	render() {
		const { imgs, selectedImg, pdfObj } = this.state;

		const largeImg = selectedImg ? (
			<img
				ref={this.imageRef}
				src={selectedImg.url}
				style={{ width: "400px", height: "300px" }}
				alt="text"
				onClick={this.setImgPosition}
			/>
		) : null;

		const style = {
			top: `${pdfObj.top}px`,
			left: `${pdfObj.left}px`,
			fontSize: `${pdfObj.fontSize}px`,
			color: `${pdfObj.color}` || "black",
			fontFamily: `${pdfObj.fontFamily}`
		};

		const userText = (
			<span
				ref={this.spanRef}
				className="typed-text"
				draggable
				style={style}
				onDragStart={(e) => this.onDragStart(e)}
				onDragEnd={(e) => this.onDragEnd(e)}
			>
				{this.state.text}
			</span>
		);

		const display = imgs ? (
			imgs.map((img) => (
				<img
					className="grid-item"
					key={img.id}
					src={`${img.url}`}
					style={{ width: "150px", height: "150px" }}
					alt={img.id}
					onClick={() => this.displayLargeImg(img)}
				/>
			))
		) : (
			<h4>Loading...</h4>
		);

		return (
			<div className="container">
				<ul className="links">
					<li className="link-bold">Flyer Creator</li>
					<li className="link-bold link2">Dbat</li>
					<li>Hello Matt</li>
				</ul>
				<div className="grid-img-container">
					<h3 className="header">Choose your template</h3>
					{display}
				</div>
				<div className="large-img-container">
					<div ref={this.spanContainer} className="img-text-container">
						<h3 className="header">Customize your template</h3>
						<p>Click on an area to add text.</p>
						{largeImg}
						{userText}
					</div>

					{/* <div className="input-container">
						<label>Type your text</label>
						<br />
						<input
							className="large-input"
							name="text"
							onChange={this.onInputChange}
							value={this.state.text}
						/>
						<button disabled={!this.state.text} className="blue-btn">
							Done
						</button>
					</div> */}
					<InputControls
						text={this.state.text}
						handleSetInputField={this.setInputField}
						onInputChange={this.onInputChange}
						handleAddInputObject={this.addInputObject}
					/>

					<div className="upload-container">
						<form onSubmit={this.onUpload}>
							<label>Upload images</label>
							<br />
							<input type="file" onChange={this.handleUpload} name="imgUpload" />
							<button className="blue-btn" onClick={this.onUpload}>
								Upload
							</button>
						</form>
					</div>

					<PdfHandler pdfObj={this.state.pdfObj} />
				</div>{" "}
				{/* end of container */}
				<Stock className="stock-container" />
			</div>
		);
	}
}

export default App;
