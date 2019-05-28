import React from "react";
import "./GridImg.css";

const GridImg = ({ imgs, displayLargeImg }) => {
	const imgDisplay = imgs ? (
		imgs.map((img) => (
			<img
				className="grid-item"
				key={img.id}
				src={`${img.url}`}
				alt={img.id}
				onClick={() => displayLargeImg(img)}
			/>
		))
	) : (
		<h4>Loading...</h4>
	);

	return <div className="grid-img-container">{imgDisplay}</div>;
};

export default GridImg;
