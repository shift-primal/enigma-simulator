import CopyButton from "./CopyButton";

const Output = ({ outputText }) => {
	return (
		<div
			id="container-output"
			className="flex items-center gap-4 justify-start"
		>
			<label className="w-24">Output:</label>
			<span
				id="output"
				className="text-2xl h-[52px] border-2 rounded-lg w-100 px-2 flex items-center"
			>
				<p className="block w-full">{outputText}</p>
			</span>
			<CopyButton outputText={outputText} />
		</div>
	);
};

export default Output;
