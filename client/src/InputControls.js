import React, { useState } from "react";
import "./InputControls.css";

const InputControls = ({ text, onInputChange, setInputField }) => {
	const [ font, setFont ] = useState("");
	const [ color, setColor ] = useState("");
	const [ size, setSize ] = useState("");

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
		//may not work; look at making this dynamic
		console.log("e name:", e.target.name);
		console.log("e value:", e.target.value);

		switch (e.target.name) {
			case "color":
				setColor(e.target.value);
				setInputField({ color: e.target.value, size, font });
				break;
			case "font":
				setFont(e.target.value);
				setInputField({ color, size, font: e.target.value });
				break;
			case "size":
				setSize(e.target.value);
				setInputField({ color, size: e.target.value, font });
				break;
			default:
				console.log("Error");
		}
	};

	const setFontStyles = () => {
		//add btn disabled styling so it doesn't tempt usr click when no text

		//set these as final styles for that input, then reset?

		//call parent function here that puts font styles into an inputField object
		//needs to include props.text as well
		//styles = {color, font, size}
		//this.props.setInputField(styles)
		console.log("hit done");
		console.log("state: ", color, font, size);
		// setInputField({
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

	return (
		<div>
			<div className="input-container">
				<label>Type your text</label>
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

				<input className="large-input" name="text" onChange={onInputChange} value={text} />
				<button onClick={() => setFontStyles()} disabled={!text} className="blue-btn">
					Done
				</button>
			</div>
		</div>
	);
};

export default InputControls;
