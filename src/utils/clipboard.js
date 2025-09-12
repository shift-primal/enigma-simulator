import { Slide, toast } from "react-toastify";

export const handleClipboard = (outputText) => {
	navigator.clipboard.writeText(outputText);
	toast(`Copied output text to clipboard!`, {
		transition: Slide,
		position: "bottom-center",
		theme: "dark",
		hideProgressBar: true,
		autoClose: 2500,
	});
};
