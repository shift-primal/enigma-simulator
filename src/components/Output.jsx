import CopyButton from "./CopyButton";

const Output = ({ outputText }) => {
	return (
		<div
			id="container-output"
			className="flex items-center gap-4 w-full"
		>
			<h1 className="w-24">Output:</h1>
			<span
				id="output"
				className="text-2xl h-[52px] border-2 rounded-lg px-2 flex items-center"
			>
				<span className="w-100 p-0 m-0">{outputText}</span>
			</span>
			<CopyButton outputText={outputText} />
		</div>
	);
};

export default Output;
