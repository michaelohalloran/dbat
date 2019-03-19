import React, { Component } from "react";
import "./DragText.css";
import { EPERM } from "constants";

export default class DragText extends Component {
	constructor() {
		super();
		this.state = {
			text: "",
			droppedText: "",
			startedDrag: false,
			makeInvisible: false,
			hovering: false
		};

		this.textRef = React.createRef();
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onDrag = (e, text) => {
		console.log("regular onDrag evt: ", e, text);
	};

	onDragStart = (e) => {
		console.log("dragStart evt target: ", e.target);
		// console.log("dragStart innerHTML: ", e.target.innerHTML);
		// console.log("dragStart textContent: ", e.target.textContent);
		console.log("dragStart dataTransfer: ", e.dataTransfer);
		let typedText = e.target.textContent;
		e.dataTransfer.setData("text", typedText);
		this.setState({
			startedDrag: true
		});
		setTimeout(() => {
			this.setState({ makeInvisible: true });
		}, 0);
	};

	onDragEnd = (e) => {
		console.log("dragEnd evt: ", e);
		this.setState({
			startedDrag: false,
			makeInvisible: false
		});
	};

	onDragOver = (e) => {
		// console.log("dragOver evt: ", e);
		e.preventDefault();
	};

	onDragEnter = (e) => {
		e.preventDefault();
		console.log("dragEnter evt: ", e);
		this.setState({ hovering: true });
	};

	onDragLeave = (e) => {
		console.log("dragLeave evt: ", e);
		//set hovering class to false on individual box
	};

	onDrop = (e) => {
		console.log("drop evt: ", e);
		let typed = e.dataTransfer.getData("text");
		console.log("typed");
		this.setState({
			droppedText: typed,
			hovering: false
		});
	};

	render() {
		return (
			<div className="drag-container">
				<img
					className="img-drop"
					id="data"
					alt="text"
					onDragOver={(e) => this.onDragOver(e)}
					onDrop={(e) => this.onDrop(e)}
					src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Batian_Nelion_and_pt_Slade_in_the_foreground_Mt_Kenya.JPG"
				/>

				<h5>Dropped text:</h5>
				<p className="dropped-text">{this.state.droppedText}</p>

				<br />

				<h5>Draggable text</h5>
				<p
					draggable
					id="text"
					className={`drag-text ${this.state.startedDrag ? "hold" : ""} ${this.state.makeInvisible
						? "invisible"
						: ""}`}
					ref={this.textRef}
					onDrag={(e) => this.onDrag(e, e.target.innerHTML)}
					onDragStart={(e) => this.onDragStart(e)}
					onDragEnd={(e) => this.onDragEnd(e)}
				>
					{this.state.text}
				</p>

				<input type="text" name="text" onChange={this.onChange} value={this.state.text} />

				<div className="container">
					<div
						className={`empty ${this.state.hovering ? "hovered" : ""}`}
						onDragEnter={(e) => this.onDragEnter(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDrop={(e) => this.onDrop(e)}
					/>
					<div
						className={`empty ${this.state.hovering ? "hovered" : ""}`}
						onDragEnter={(e) => this.onDragEnter(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDrop={(e) => this.onDrop(e)}
					/>
					<div
						className={`empty ${this.state.hovering ? "hovered" : ""}`}
						onDragEnter={(e) => this.onDragEnter(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDrop={(e) => this.onDrop(e)}
					/>
					<div
						className={`empty ${this.state.hovering ? "hovered" : ""}`}
						onDragEnter={(e) => this.onDragEnter(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDragLeave={(e) => this.onDragLeave(e)}
						onDrop={(e) => this.onDrop(e)}
					/>
				</div>
			</div>
		);
	}
}
