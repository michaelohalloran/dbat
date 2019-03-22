import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";
import Stock from "./Stock";
import { API_BASE_URL } from "./config/config";

class App extends Component {
	constructor() {
		super();

		this.state = {
			imgs: [],
			text: "",
			selectedImg: null,
			textLeft: "",
			textTop: "",
			singleImg: "",
			uploadedFile: "",
			uploadUrl: ""
		};

		this.spanRef = React.createRef();
		this.spanContainer = React.createRef();
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
		this.setState(
			{
				textLeft: `${e.pageX}px`,
				textTop: `${e.pageY}px`
			},
			() => {
				this.spanRef.current.style.top = this.state.textTop;
				this.spanRef.current.style.left = this.state.textLeft;
			}
		);
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

	generatePdf = () => {
		axios
			.post(
				`${API_BASE_URL}/pdf`,
				{ imgUrl: "test2" },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/pdf"
					},
					responseType: "blob"
				}
			)
			.then((res) => {
				console.log("res1: ", res);
				axios.get(`${API_BASE_URL}/pdf`, { responseType: "blob", headers: { Accept: "application/pdf" } });
			})
			.then((res) => {
				console.log("res2: ", res);
				const pdfBlob = new Blob([ res.data ], { type: "application/pdf" });
				saveAs(pdfBlob, "newPdf.pdf");
			})
			.catch((e) => {
				console.log("client side get error: ", e);
			});
		//have some state that gets sent with this: image url and/or id to fetch from backend
		//perhaps also the typed text, and maybe an object with top/left offset positions for html template in index.js
	};

	render() {
		const { imgs, selectedImg } = this.state;

		const largeImg = selectedImg ? (
			<img
				src={selectedImg.url}
				style={{ width: "400px", height: "300px" }}
				alt="text"
				onClick={this.setImgPosition}
			/>
		) : null;

		const userText = (
			<span ref={this.spanRef} className="typed-text">
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

					<div className="input-container">
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
					</div>

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

					<div className="footer-btn-container">
						<button className="footer-btn blue-btn">Cancel</button>
						<button className="print-btn" onClick={this.generatePdf}>
							Create and download PDF/Print
						</button>
						<button className="footer-btn blue-btn">Save</button>
					</div>
				</div>

				<Stock className="stock-container" />
			</div>
		);
	}
}

export default App;
