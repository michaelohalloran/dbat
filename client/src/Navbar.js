import React from "react";
import "./Navbar.css";

const Navbar = ({ clearText }) => {
	const clearTypedText = () => {
		clearText();
	};

	return (
		<ul className="link-bar">
			<li className="link-bold">Flyer Creator</li>
			<button onClick={clearTypedText} className="footer-btn white-btn">
				New
				<i className="fa fa-plus-square fa-2x" style={{ marginLeft: "10px" }} />
			</button>
			<button className="footer-btn white-btn">
				Save
				<i className="fa fa-save fa-2x" style={{ marginLeft: "10px" }} />
			</button>
			<li className="link-bold">Dbat</li>
			{/* make this dynamic, load username from DB, have isLoggedIn check */}
			<li>
				Hello Matt
				<i className="fa fa-2x fa-user-circle" style={{ marginLeft: "10px" }} />
			</li>
		</ul>
	);
};

export default Navbar;
