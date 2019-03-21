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
			hovering: false,
			textX: null,
			textY: null
		};

		this.textRef = React.createRef();
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// https://developer.mozilla.org/en-US/docs/Web/CSS/CSSOM_View/Coordinate_systems#Example
	onDrag = (e, text) => {
		console.log("onDrag clientX/Y", e.clientX, e.clientY);
		console.log("onDrag screenX/Y", e.screenX, e.screenY);
		// console.log("onDrag movementX/Y", e.movementX, e.movementY); //difference btwn last mouse movement and next
		console.log("onDrag pageX/Y", e.pageX, e.pageY);

		// console.log("regular onDrag evt: ", e, text);
		this.setState({
			textX: e.clientX,
			textY: e.clientY
		});
	};

	onDragStart = (e) => {
		// console.log("dragStart evt target: ", e.target);
		// console.log("dragStart innerHTML: ", e.target.innerHTML);
		// console.log("dragStart textContent: ", e.target.textContent);
		// console.log("dragStart dataTransfer: ", e.dataTransfer);
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
		console.log("dragEnd offset: ", e.target.style);
		const x = e.clientX;
		const y = e.clientY;
		console.log("textRef styles: ", this.textRef.style);
		this.setState({
			startedDrag: false,
			makeInvisible: false,
			textX: e.clientX,
			textY: e.clientY
		});
	};

	onDragOver = (e) => {
		// console.log("dragOver evt: ", e);
		e.preventDefault();
	};

	onDragEnter = (e) => {
		e.preventDefault();
		// console.log("dragEnter evt: ", e);
		this.setState({ hovering: true });
	};

	onDragLeave = (e) => {
		// console.log("dragLeave evt: ", e);
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
		const styles = {
			// clientX: this.state.textX,
			// clientY: this.state.textY,
			// position: "absolute",
			top: `${this.state.textY}px`,
			left: `${this.state.textX}px`
		};

		return (
			<div className="drag-container">
				<h6>
					currentX: {this.state.textX}, currentY: {this.state.textY}
				</h6>
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
					style={{ top: `${this.state.textY}px`, left: `${this.state.textX}px`, zIndex: "100" }}
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
