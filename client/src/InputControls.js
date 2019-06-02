// import React, { useState } from "react";
import "./InputControls.css";
import React, { Component } from "react";

class InputControls extends Component {
	state = {
		fontFamily: "",
		color: "",
		fontSize: "",
		typedText: ""
	};

	generateFontSizes = () => {
		let options = [];

		for (let i = 2; i < 42; i += 2) {
			options.push(i);
		}

		return options.map((num) => {
			return (
				<option key={num} value={num}>
					{num}
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

	// set finalized styles for the current input
	updateInputs = () => {
		const { text, handleAddInputObject } = this.props;
		const { color, fontSize, fontFamily } = this.state;
		// push completed input styles into the inputFields state array
		handleAddInputObject({ color, fontFamily, fontSize: `${fontSize}px` });
		// clear the input state and make a new empty one
		this.setState({ color: "", fontFamily: "", fontSize: "" });
	};

	render() {
		const { color, fontSize, fontFamily } = this.state;
		const { text } = this.props;

		return (
			<div className="input-container">
				<label>Enter text</label>
				<br />
				<input className="large-input" name="text" onChange={this.handleChange} value={text} />
				{/* {error && <span>{error}</span>} */}
				<button onClick={() => this.updateInputs()} disabled={!text} className="blue-btn">
					Add text
				</button>

				<div className="font-controls">
					<select value={color ? color : "Color"} onChange={this.handleChange} name="color" id="color">
						<option value="black">Black</option>
						<option value="red">Red</option>
						<option value="yellow">Yellow</option>
						<option value="white">White</option>
					</select>

					<select
						value={fontFamily ? fontFamily : "Font"}
						onChange={this.handleChange}
						name="fontFamily"
						id="fontFamily"
					>
						<option value="Helvetica">Helvetica</option>
						<option value="Georgia">Georgia</option>
					</select>

					<select
						value={fontSize ? fontSize : "Font Size"}
						onChange={this.handleChange}
						name="fontSize"
						id="fontSize"
					>
						{this.generateFontSizes()}
					</select>
				</div>
			</div>
		);
	}
}

export default InputControls;
