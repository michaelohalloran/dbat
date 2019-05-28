import React from "react";
import axios from "axios";
import { API_BASE_URL } from "./config/config";
import { saveAs } from "file-saver";
import "./PdfHandler.css";

const PdfHandler = ({ pdfObj }) => {
	const generatePdf = () => {
		console.log("hit generate PDF");
		axios
			.post(`${API_BASE_URL}/pdf`, pdfObj, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/pdf"
				},
				responseType: "blob"
			})
			.then((res) => {
				return axios.get(`${API_BASE_URL}/pdf`, {
					responseType: "blob",
					headers: { Accept: "application/pdf" }
				});
			})
			.then((res) => {
				const pdfBlob = new Blob([ res.data ], { type: "application/pdf" });
				saveAs(pdfBlob, "newPdf.pdf");
			})
			.catch((e) => {
				console.log("client side get error: ", e);
			});
		//have some state that gets sent with this: image url and/or id to fetch from backend
		//perhaps also the typed text, and maybe an object with top/left offset positions for html template in index.js
	};

	return (
		<div className="pdf-btn-container">
			<span className="print-msg">Ready to print?</span>
			<button className="blue-btn" onClick={generatePdf}>
				Create PDF
			</button>
		</div>
	);
};

export default PdfHandler;
