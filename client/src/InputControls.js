// import React, { useState } from "react";
import "./InputControls.css";
import React, { Component } from "react";

class InputControls extends Component {
	state = {
		typedText: "",
		fontWeight: "normal",
		textDecoration: "none",
		fontStyle: "normal"
	};

	generateColors = () => {
		const colors = [ "black", "white", "red", "orange", "yellow", "green", "blue", "purple", "brown" ];

		return colors.map((color) => (
			<option key={color} value={color}>
				{`${color[0].toUpperCase()}${color.slice(1)}`}
			</option>
		));
	};

	generateFonts = () => {
		const fonts = [
			"Times New Roman",
			"Helvetica",
			"Arial",
			"Georgia",
			"Palatino Linotype",
			"Book Antiqua",
			"Gadget",
			"Comic Sans MS",
			"Impact",
			"Lucida Sans Unicode",
			"Lucida Grande",
			"Charcoal",
			"Tahoma",
			"Geneva",
			"Verdana"
		];
		return fonts.map((font) => {
			return (
				<option key={font} value={font}>
					{`${font[0].toUpperCase()}${font.slice(1)}`}
				</option>
			);
		});
	};

	handleChange = (e) => {
		const { onInputChange } = this.props;
		// so context isn't lost before it's passed upstream
		const evtName = e.target.name;
		const evtValue = e.target.value;
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => {
				onInputChange(evtName, evtValue);
			}
		);
	};

	toggleStyle = (e) => {
		let evtValue = e.target.value;
		const evtName = e.target.name;
		switch (evtName) {
			case "fontWeight":
				evtValue = e.target.value === "normal" ? "bold" : "normal";
				break;
			case "fontStyle":
				evtValue = e.target.value === "normal" ? "italic" : "normal";
				break;
			case "textDecoration":
				evtValue = e.target.value === "none" ? "underline" : "none";
				break;
			default:
				console.log("value not found");
		}

		const { onInputChange } = this.props;
		this.setState(
			{
				[e.target.name]: evtValue
			},
			() => {
				onInputChange(evtName, evtValue);
			}
		);
	};

	// set finalized styles for the current input
	updateInputs = () => {
		const { handleAddInputObject } = this.props;
		const {
			color = "black",
			fontSize = 16,
			fontFamily = "Helvetica",
			fontWeight,
			textDecoration,
			fontStyle
		} = this.state;
		// push completed input styles into the inputFields state array
		handleAddInputObject({ color, fontFamily, textDecoration, fontStyle, fontWeight, fontSize: `${fontSize}px` });
		// clear the input state and make a new empty one
		this.setState({ color: "", fontFamily: "", fontSize: "" });
	};

	render() {
		const { color, fontSize, fontFamily } = this.state;
		const { text } = this.props;

		return (
			<div className="input-container">
				<h3>Enter text</h3>
				<br />
				<input className="large-input" name="text" onChange={this.handleChange} value={text} />
				{/* {error && <span>{error}</span>} */}

				<div className="font-controls">
					<div className="select-wrapper">
						<label htmlFor="color">Color</label>
						<select value={color ? color : "Color"} onChange={this.handleChange} name="color" id="color">
							{this.generateColors()};
						</select>
					</div>

					<div className="select-wrapper">
						<label htmlFor="fontFamily">Font</label>
						<select
							value={fontFamily ? fontFamily : "Font"}
							onChange={this.handleChange}
							name="fontFamily"
							id="fontFamily"
						>
							{this.generateFonts()}
						</select>
					</div>

					<div className="select-wrapper">
						<label htmlFor="fontSize">Size</label>
						<input
							type="number"
							min="1"
							value={fontSize ? fontSize : "16px"}
							onChange={this.handleChange}
							name="fontSize"
							id="fontSize"
						/>
					</div>

					<div className="style-btn-wrapper">
						<button
							onClick={this.toggleStyle}
							value={this.state.fontWeight}
							name="fontWeight"
							className={`font-btn ${this.state.fontWeight === "bold" ? "pressed" : ""}`}
						>
							B
						</button>
						<button
							onClick={this.toggleStyle}
							value={this.state.fontStyle}
							name="fontStyle"
							className={`font-btn ${this.state.fontStyle === "italic" ? "pressed" : ""}`}
						>
							I
						</button>
						<button
							onClick={this.toggleStyle}
							value={this.state.textDecoration}
							name="textDecoration"
							className={`font-btn ${this.state.textDecoration === "underline" ? "pressed" : ""}`}
						>
							U
						</button>
					</div>

					<div className="btn-wrapper">
						<button onClick={() => this.updateInputs()} disabled={!text} className="blue-btn add-btn">
							Add text
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default InputControls;
