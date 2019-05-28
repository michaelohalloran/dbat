import React from "react";
import "./Navbar.css";

const Navbar = () => {
	return (
		<ul className="link-bar">
			<li className="link-bold">Flyer Creator</li>
			<button className="footer-btn white-btn">New</button>
			<button className="footer-btn white-btn">Save</button>
			<li className="link-bold">Dbat</li>
			{/* make this dynamic, load username from DB, have isLoggedIn check */}
			<li>Hello Matt</li>
		</ul>
	);
};

export default Navbar;
