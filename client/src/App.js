import React, { Component } from "react";
import "./App.css";
import axios from "axios";
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
			// testImg2: ''
		};

		this.spanRef = React.createRef();
		this.spanContainer = React.createRef();
	}

	// https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
	//collection ids: https://unsplash.com/collections
	loadImages = async () => {
		// let imgs = Array(9).fill(0).map((item) => {
		// 	axios.get('http://www.splashbase.co/api/v1/images/random').then((res) => {
		// 		item = {
		// 			id: res.data.id,
		// 			url: res.data.url,
		// 			selected: false
		// 		};
		// 		return item;
		// 	});
		// });
		// this.setState(
		// 	{
		// 		imgs: [ ...this.state.imgs, imgs ]
		// 	}
		// 	// () => this.setDefaultLargeImg()
		// );

		// let imgs = Array(9).fill(0).map((item) => {
		// 	axios.get("http://www.splashbase.co/api/v1/images/random").then((res) => {
		// 		item = {
		// 			id: res.data.id,
		// 			url: res.data.url,
		// 			selected: false
		// 		};
		// 		// do this inside following setState?: () => this.setDefaultLargeImg();
		// 		this.setState({ imgs: [ ...this.state.imgs, item ] });
		// 	});
		// });

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

	// testImg = () => {
	//   console.log('hit testImg');
	//   axios.get('https://source.unsplash.com/random/150x150')
	//     .then(res => this.setState({singleImg: res.request.responseUrl}))
	//     console.log(this.state.singleImg);
	//     // .then(()=> this.setState({
	//     //     imgs: [...this.state.imgs, this.state.singleImg]
	//     // })

	//     // .then(res => console.log(res.request.responseUrl));
	//   }

	// testImg2 = () => {
	//   axios.get('http://www.splashbase.co/api/v1/images/random')
	//     .then(res => this.setState({
	//       testImg2: res.data.url,
	//     }));
	// }

	componentDidMount() {
		//make API call, load images, also set default (as callback to loadImages, after setting state)
		this.loadImages();
		// this.testImg();
		// this.testImg2();
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
		console.log("updloaded file, updloadUrl: ", this.state.uploadedFile, this.state.uploadUrl);

		//BACKEND METHOD:
		//axios request to Firebase or MongoDB
		const fd = new FormData();
		fd.append("image", this.state.uploadedFile, this.state.uploadedFile.name);
		axios.post(`${API_BASE_URL}/images`, fd).then((res) => console.log("DB response: ", res));

		//fetch images from DB
		this.loadImages();
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

		// const testImg = singleImg ? <img src={`${singleImg}`} alt="text"/> : <h3>Loading...</h3>;
		// const testImg = <img src={'https://source.unsplash.com/random/150x150'} alt="text"/>;
		// const testImg2 = <img src={this.state.testImg2} alt="testImg2"/>;
		// const testImg = uploadUrl ? <img onClick={this.setSelectedImg} src={uploadUrl} alt="img"/> : <h6>Pick an image</h6>;

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

				{/* {testImg2} */}

				{/* <hr /> */}

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
						{/* {testImg} */}
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

						{/* {testImg} */}
					</div>

					<div className="footer-btn-container">
						<button className="footer-btn blue-btn">Cancel</button>
						<button className="print-btn">Print</button>
						<button className="footer-btn blue-btn">Save</button>
					</div>
				</div>

				<Stock className="stock-container" />
			</div>
		);
	}
}

export default App;
