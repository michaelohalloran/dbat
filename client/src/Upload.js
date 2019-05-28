import React from "react";

const Upload = ({ onUpload, handleUpload }) => {
	return (
		<div className="upload-container">
			<form onSubmit={(e) => onUpload(e)}>
				<label>Upload images</label>
				<br />
				<input type="file" onChange={(e) => handleUpload(e)} name="imgUpload" />
				<button className="blue-btn">Upload</button>
			</form>
		</div>
	);
};

export default Upload;
