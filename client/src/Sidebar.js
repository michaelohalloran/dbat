import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setSidebarDisplay, showLogos, showTemplates, showText }) => {
	return (
		<ul className="sidebar-btns">
			<li className="sidebar-tab" onClick={(e) => setSidebarDisplay(e)}>
				<i
					className={`fa fa-arrow-circle-${showTemplates ? "down" : "right"}`}
					style={{ marginRight: "10px" }}
				/>
				Templates
			</li>
			<li className="sidebar-tab" onClick={(e) => setSidebarDisplay(e)}>
				<i className={`fa fa-arrow-circle-${showLogos ? "down" : "right"}`} style={{ marginRight: "10px" }} />
				Graphics/Logos
			</li>
			<li className="sidebar-tab" onClick={(e) => setSidebarDisplay(e)}>
				<i className={`fa fa-arrow-circle-${showText ? "down" : "right"}`} style={{ marginRight: "10px" }} />
				Text
			</li>
		</ul>
	);
};

export default Sidebar;
