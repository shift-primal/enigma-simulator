const Input = ({ inputText, setInputText }) => {

	
	return (
		<div
			id="container-userInput"
			className="w-full"
		>
			<form className="flex items-center gap-4 place-self-start">
				<label
					htmlFor="userInput"
					className="w-24"
				>
					Message:
				</label>
				<input
					value={inputText}
					id="userInput"
					name="userInput"
					type="text"
					placeholder="Message.."
					className="border-2 rounded-lg p-2 w-100"
					spellCheck="false"
					onChange={(e) => {
						e.preventDefault();
						setInputText(e.target.value.toUpperCase());
					}}
				/>
			</form>
		</div>
	);
};

export default Input;
