import { Copy } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Slide } from "react-toastify/unstyled";

const Encrypt = () => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");

	const [password, setPassword] = useState("");

	const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const allowedSymbols = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");
	const numbers = "1234567890".split("");

	function handleSubmit(e) {
		e.preventDefault();
		const output = encryptMessage(inputText, password);

		console.log("Form submitted..");
		console.log(`Input: "${inputText}"`);
		console.log(`Password: "${password}"`);
		console.log(`Output: "${output}"`);

		setOutputText(output);
	}

	function encryptMessage(message, password) {
		let newPass = [];
		password.split("").forEach((char) => {
			if (numbers.includes(char)) {
				newPass.push(Number(char));
			} else {
				let location = lowerAlphabet.indexOf(char.toLowerCase());
				newPass.push(location);
			}
		});

		const accumulatedPassword = newPass.reduce((acc, curr) => {
			return acc + Number(curr);
		});

		const shift = accumulatedPassword % 26;
		let encryptedMessage = "";
		message.split("").forEach((char, i) => {
			let location = lowerAlphabet.indexOf(char.toLowerCase()) + shift;

			if (location >= 26) {
				location -= 26;
			}

			if (lowerAlphabet.includes(char)) {
				encryptedMessage += lowerAlphabet[location];
			} else if (upperAlphabet.includes(char)) {
				encryptedMessage += upperAlphabet[location];
			} else if (allowedSymbols.includes(char)) {
				encryptedMessage += char;
			} else {
				console.log("Invalid inputs spotted.");
				return;
			}
		});
		return encryptedMessage;
	}
	return (
		<div
			id="encrypt-container"
			className="bg-gray-50 w-[35%] p-8 border-2 border-gray-600 rounded-4xl flex flex-col gap-4 items-center justify-center"
		>
			<h1 className="text-3xl">Encrypt message</h1>
			<form
				className="text-2xl p-4 flex flex-col gap-4"
				onSubmit={handleSubmit}
			>
				<div
					id="container-userInput"
					className="flex items-center gap-4 justify-end"
				>
					<label htmlFor="userInput">Message:</label>
					<input
						id="userInput"
						name="userInput"
						type="text"
						placeholder="Message.."
						className="border-2 rounded-lg p-2 w-100"
						spellCheck="false"
						onChange={(e) => {
							setInputText(e.target.value);
						}}
					/>
				</div>
				<div
					id="container-passwordInput"
					className="flex items-center gap-4 justify-end"
				>
					<label htmlFor="passwordInput">Password:</label>
					<input
						id="passwordInput"
						name="passwordInput"
						type="text"
						placeholder="Password.."
						className="border-2 rounded-lg p-2 w-100"
						spellCheck="false"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</div>

				<input
					name="submitButton"
					type="submit"
					className="border-2 py-2 px-4 w-fit self-center rounded-lg cursor-pointer"
				/>
			</form>
			<hr className="w-full opacity-25" />
			<h2 className="text-3xl">Output:</h2>
			<div
				id="container-output-message"
				className="flex gap-2"
			>
				<span className="text-4xl h-12 border-2 rounded-lg w-100 px-2 flex items-center">
					<p className="block w-full">{outputText}</p>
				</span>
				<button
					className="border-2 rounded-lg h-12 flex items-center justify-center aspect-square cursor-pointer hover:brightness-90 bg-white"
					onClick={() => {
						navigator.clipboard.writeText(outputText);
						toast(`Copied output text to clipboard!`, {
							transition: Slide,
							position: "bottom-center",
							theme: "dark",
							hideProgressBar: true,
							autoClose: 2500,
						});
					}}
				>
					<Copy />
				</button>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Encrypt;
