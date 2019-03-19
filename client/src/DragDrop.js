import React, { Component } from "react";
import "./DragDrop.css";

export default class DragDrop extends Component {
	constructor() {
		super();

		this.state = {
			dropEvt: null,
			imgSrc: null
		};

		this.imgRef = React.createRef();
	}

	onDragStart = (e, img) => {
		console.log("dragstart evt: ", e.target, this.imgRef.current.src); //this is the img url
		console.log("dragstart transfer: ", e.dataTransfer);
		let imgUrl = e.target.src;
		e.dataTransfer.setData("data", imgUrl);
		console.log("target id", e.target.id);
	};

	onDragOver = (e) => {
		// console.log('dragover evt: ', e.target); //target is the div we're dropping in
		e.preventDefault();
	};

	onDrop = (e) => {
		console.log("drop evt: ", e);
		console.log("drop transfer: ", e.dataTransfer);
		let src = e.dataTransfer.getData("data");
		console.log("src: ", src);
		this.setState({
			dropEvt: true,
			imgSrc: src
		});
	};

	render() {
		const img = this.imgRef && <img src={this.state.imgSrc} alt="text" />;

		return (
			<div>
				<div className="dragzone" draggable>
					<img
						id="data"
						alt="text"
						ref={this.imgRef}
						src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG"
						onDragStart={(e, src) => this.onDragStart(e, src)}
					/>
				</div>

				<div className="dropzone" onDragOver={(e) => this.onDragOver(e)} onDrop={(e) => this.onDrop(e)}>
					{img}
					{this.dropEvt ? <h3>Dropped</h3> : null}
				</div>
			</div>
		);
	}
}
