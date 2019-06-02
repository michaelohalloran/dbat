import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Stock from "./Stock";
import { API_BASE_URL } from "./config/config";
import PdfHandler from "./PdfHandler";
import Upload from "./Upload";
import InputControls from "./InputControls";
import Navbar from "./Navbar";
import GridImg from "./GridImg";
import Sidebar from "./Sidebar";

class App extends Component {
	constructor() {
		super();

		this.state = {
			showTemplates: false,
			showLogos: false,
			showText: true,
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

		this.setState(
			{
				imgs: [ ...imgsArr ]
			},
			() => this.setDefaultLargeImg()
		);
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
		this.setState({ selectedImg: img });
	};

	setSidebarDisplay = (e) => {
		if (e.target.innerText === "Text") {
			this.setState({
				showText: true,
				showLogos: false,
				showTemplates: false
			});
		} else if (e.target.innerText === "Templates") {
			this.setState({
				showText: false,
				showLogos: false,
				showTemplates: true
			});
		} else if (e.target.innerText === "Graphics/Logos") {
			this.setState({
				showText: false,
				showLogos: true,
				showTemplates: false
			});
		}
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
		// console.table(coords);
		// console.log(
		// 	"spanContainer div left, top: ",
		// 	this.spanContainer.current.offsetLeft,
		// 	this.spanContainer.current.offsetTop
		// );
		// console.log("spanRef text left, top: ", this.spanRef.current.offsetLeft, this.spanRef.current.offsetTop);
		// console.log("imageRef left, top: ", this.imageRef.current.offsetLeft, this.imageRef.current.offsetTop);
		// console.log("clientX - offsetLeft: ", e.clientX - this.imageRef.current.offsetLeft);
		// console.log("clientY - offsetTop: ", e.clientY - this.imageRef.current.offsetTop);
		// console.log("e.clientX, clientY: ", e.clientX, e.clientY);
		const leftOffset = e.clientX - this.spanContainer.current.offsetLeft;
		const topOffset = e.clientY - this.spanContainer.current.offsetTop;
		console.log("left and top to be sent to DB:", leftOffset, topOffset);
		this.setState({
			pdfObj: {
				...this.state.pdfObj,
				top: topOffset,
				left: leftOffset,
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

	onInputChange = (name, value) => {
		if (name === "text") {
			this.setState({ [name]: value });
		} else {
			this.setState({
				pdfObj: { ...this.state.pdfObj, [name]: value }
			});
		}
	};

	addInputObject = (inputStyles) => {
		const newInput = { ...this.state.pdfObj, ...inputStyles };
		this.setState({
			inputFields: [ ...this.state.inputFields, newInput ],
			text: "",
			pdfObj: {}
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
		const fd = new FormData();
		fd.append("image", this.state.uploadedFile, this.state.uploadedFile.name);
		axios.post(`${API_BASE_URL}/images`, fd).then((res) => {
			console.log("DB response: ", res);
			//fetch images from DB
			this.loadImages();
		});
	};

	render() {
		const { imgs, selectedImg, pdfObj, showLogos, showTemplates, showText } = this.state;

		const largeImg = selectedImg ? (
			<img
				ref={this.imageRef}
				src={selectedImg.url}
				style={{ width: "100%" }}
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

		// console.log("style: ", style);

		const inputs = this.state.inputFields.map((input, i) => {
			const { color, fontFamily, fontSize, top, left } = input;
			const style = {
				color,
				fontFamily,
				fontSize,
				top,
				left,
				position: "absolute"
			};
			// console.log("input: ", input);
			return (
				<span
					key={i}
					// className="typed-text"
					style={style}
					onDragEnd={(e) => this.onDragEnd(e)}
				>
					{input.text}
				</span>
			);
		});

		// console.log("************inputs: ", inputs);

		const userText = (
			<span
				ref={this.spanRef}
				className="typed-text"
				draggable
				style={style}
				// onDragStart={(e) => this.onDragStart(e)}
				onDragEnd={(e) => this.onDragEnd(e)}
			>
				{this.state.text}
			</span>
		);

		const sidebarDisplay = showText ? (
			<InputControls
				text={this.state.text}
				pdfObj={this.state.inputFields}
				onInputChange={this.onInputChange}
				handleAddInputObject={this.addInputObject}
			/>
		) : showLogos ? (
			<Stock />
		) : showTemplates ? (
			<GridImg displayLargeImg={this.displayLargeImg} imgs={imgs} />
		) : null;

		return (
			<div className="main-container">
				<Navbar />
				<PdfHandler inputArr={this.state.inputFields} />
				<Sidebar setSidebarDisplay={this.setSidebarDisplay} />
				{sidebarDisplay}
				<div className="large-img-container">
					<div ref={this.spanContainer} className="img-text-container">
						{largeImg}
						{inputs}
						{userText}
					</div>

					<Upload handleUpload={this.handleUpload} onUpload={this.onUpload} />
				</div>{" "}
				{/* <Stock className="stock-container" /> */}
			</div>
		);
	}
}

export default App;
