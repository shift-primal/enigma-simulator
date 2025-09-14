import { Copy } from "lucide-react";
import { handleClipboard } from "../utils/clipboard";

const CopyButton = ({ outputText }) => {
	return (
		<button
			className="border-2 rounded-lg self-stretch px-3 flex items-center justify-center aspect-square cursor-pointer hover:brightness-90 bg-white"
			onClick={(e) => {
				e.preventDefault();
				handleClipboard(outputText);
			}}
		>
			<Copy />
		</button>
	);
};

export default CopyButton;
