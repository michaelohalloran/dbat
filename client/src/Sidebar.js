import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setSidebarDisplay }) => {
	return (
		<ul className="sidebar-btns">
			<li className="sidebar-tab" onClick={(e) => setSidebarDisplay(e)}>
				Templates
			</li>
			<li className="sidebar-tab" onClick={(e) => setSidebarDisplay(e)}>
				Graphics/Logos
			</li>
			<li className="sidebar-tab" onClick={(e) => setSidebarDisplay(e)}>
				Text
			</li>
		</ul>
	);
};

export default Sidebar;
