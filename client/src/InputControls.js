import React, { useState } from "react";
import "./InputControls.css";

const InputControls = ({ text, onInputChange, handleSetInputField, handleAddInputObject }) => {
	// set defaults, but sync these below w/ e.target.value, etc.
	const [ font, setFont ] = useState("");
	const [ color, setColor ] = useState("white");
	const [ size, setSize ] = useState("16px");
	const [ error, setError ] = useState("");

	const generateFontSizes = () => {
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

	const handleChange = (e) => {
		// console.log("e name:", e.target.name);
		// console.log("e value:", e.target.value);

		switch (e.target.name) {
			case "color":
				setColor(e.target.value);
				handleSetInputField({ color: e.target.value, size, font });
				break;
			case "font":
				setFont(e.target.value);
				handleSetInputField({ color, size, font: e.target.value });
				break;
			case "size":
				setSize(e.target.value);
				handleSetInputField({ color, size: e.target.value, font });
				break;
			default:
				console.log("Error");
		}
	};

	const updateInputs = () => {
		console.log("hit updateInputs");

		// show error if user clicks done with no typed text
		if (!text) {
			console.log("no text entered");
			setError("Please type some text");
			console.log("text: ", text, "error: ", error);
		}

		if (text && error !== "") {
			setError("");
		}

		// set finalized styles for the current input
		setFontStyles();

		// push this completed input *JUST THE VALUES, (e.g. text, styles, etc.) into the inputFields state array
		// handleAddInputObject({font, color, size, text}})

		// clear the input state and make a new empty one

		// we never need more than one input; each time we click done the input gets cleared and is now usable by a new user typed text
	};

	const setFontStyles = () => {
		//add btn disabled styling so it doesn't tempt user to click when no text

		// text ?
		//set these as final styles for that input, then reset?

		//call parent function here that puts font styles into an inputField object
		//needs to include props.text as well
		//styles = {color, font, size}
		//this.props.handleSetInputField(styles)
		console.log("hit done");
		console.log("state (color, font, size, text): ", color, font, size, text);
		// handleSetInputField({
		// 	color,
		// 	font,
		// 	size
		// });
		// return {
		// 	color,
		// 	font,
		// 	size
		// }
	};

	// const showEmptyTextError = () => {
	// 	if (!text) {
	// 		setError("Please type some text");
	// 	}
	// }

	return (
		<div className="input-container">
			<label>Enter text</label>
			<br />

			<div className="font-controls">
				<select value={color ? color : "Color"} onChange={handleChange} name="color" id="color">
					<option value="black">Black</option>
					<option value="red">Red</option>
					<option value="yellow">Yellow</option>
					<option value="white">White</option>
				</select>

				<select value={font ? font : "Font"} onChange={handleChange} name="font" id="font">
					<option value="Helvetica">Helvetica</option>
					<option value="Georgia">Georgia</option>
				</select>

				<select value={size ? size : "Font Size"} onChange={handleChange} name="size" id="size">
					{generateFontSizes()}
				</select>
			</div>

			{/* give error if done is clicked with no text: */}

			<input className="large-input" name="text" onChange={onInputChange} value={text} />
			{error && <span>{error}</span>}
			{/* <button onClick={() => updateInputs()} disabled={!text} className="blue-btn"> */}
			<button onClick={() => updateInputs()} className="blue-btn">
				Add text
			</button>
		</div>
	);
};

export default InputControls;
