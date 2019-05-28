import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setSidebarDisplay }) => {
	return (
		<ul className="sidebar-btns">
			<li onClick={(e) => setSidebarDisplay(e)}>Templates</li>
			<li onClick={(e) => setSidebarDisplay(e)}>Graphics/Logos</li>
			<li onClick={(e) => setSidebarDisplay(e)}>Text</li>
		</ul>
	);
};

export default Sidebar;
