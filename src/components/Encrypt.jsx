import { shuffle } from "fast-shuffle";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Slide } from "react-toastify/unstyled";

const Encrypt = () => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	const rotorsInfo = {
		rotorI: {
			wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
			notch: "Q",
		},
		rotorII: {
			wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
			notch: "E",
		},
		rotorIII: {
			wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
			notch: "V",
		},
		rotorIV: {
			wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB".split(""),
			notch: "J",
		},
		rotorV: {
			wiring: "VZBRGITYUPSDNHLXAWMJQOFECK".split(""),
			notch: "Z",
		},
	};

	const reflectors = {
		reflectorA: "EJMZALYXVBWFCRQUONTSPIKHGD".split(""),
		reflectorB: "YRUHQSLDPXNGOKMIEBFZCWVJAT".split(""),
		reflectorC: "FVPJIAOYEDRZXWGCTKUQSBNMHL".split(""),
	};

	const machineSettings = {
		rotors: {
			left: { selectedRotor: rotorsInfo.rotorI, position: 0, ringSetting: 0, id: 2 },
			mid: { selectedRotor: rotorsInfo.rotorII, position: 0, ringSetting: 0, id: 1 },
			right: { selectedRotor: rotorsInfo.rotorIII, position: 0, ringSetting: 0, id: 0 },
		},

		selectedReflector: reflectors.reflectorB,
	};

	useEffect(() => {
		handleOutput(inputText);
	}, [inputText]);

	const lowerAlphabet = "abcdefghijklmnopqrstuvwxyzæøå".split("");
	const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("");
	const symbols = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~".split("");
	const numbers = "1234567890".split("");

	const allowedCharacters = [...lowerAlphabet, ...upperAlphabet, ...symbols, ...numbers];

	function handleChange(e) {
		e.preventDefault();
		setInputText(e.target.value.toUpperCase());
	}

	function sanitizeInput(msg) {
		return msg.split("").some((char) => {
			return !allowedCharacters.includes(char);
		});
	}

	function handleOutput(msg) {
		if (sanitizeInput(msg)) {
			setOutputText("Invalid input detected.");
			return;
		}

		setOutputText(encryptMsg(msg));
	}

	function shiftRotor() {
		const rotors = machineSettings.rotors;
		rotors.right.position = (rotors.right.position + 1) % 26;
	}

	function encryptRotors(char, direction) {
		if (direction === "forward") {
			shiftRotor();
			console.log("Starting rotor encryption...");
			console.log("Direction: Forwards");
			console.log("Settings: ", machineSettings);

			let currIndex = alphabet.indexOf(char);
			let currLetter = alphabet[currIndex];
			console.log(`Starting letter: ${currLetter} - Index: ${currIndex}`);

			const rotorsArr = Object.entries(machineSettings.rotors).sort((a, b) => a[1].id - b[1].id);
			console.log("Rotors:", rotorsArr);

			rotorsArr.forEach((rotor) => {
				const rotorWiring = rotor[1].selectedRotor.wiring;
				const rotorPos = rotor[1].position;
				const offsetIndex = (currIndex + rotorPos) % 26;

				currLetter = rotorWiring[offsetIndex];

				currIndex = (alphabet.indexOf(currLetter) - rotorPos + 26) % 26;
				currLetter = alphabet[currIndex];

				console.log(`Going through rotor: ${rotor[0]} - New Letter: ${currLetter} - New Index: ${currIndex}`);
			});

			return currIndex;
		} else if (direction === "backwards") {
			console.log("Starting rotor encryption...");
			console.log("Direction: Backwards");
			console.log("Settings: ", machineSettings);

			let currIndex = alphabet.indexOf(char);
			let currLetter = alphabet[currIndex];
			console.log(`Starting letter: ${currLetter} - Index: ${currIndex}`);

			const rotorsArr = Object.entries(machineSettings.rotors);
			console.log("Rotors:", rotorsArr);

			rotorsArr.forEach((rotor) => {
				const rotorWiring = rotor[1].selectedRotor.wiring;
				const rotorPos = rotor[1].position;
				const offsetIndex = (currIndex + rotorPos) % 26;
				const wirePosition = rotorWiring.indexOf(alphabet[offsetIndex]);

				currIndex = (wirePosition - rotorPos + 26) % 26;
				currLetter = alphabet[currIndex];

				console.log(`Going through rotor: ${rotor[0]} - New Letter: ${currLetter} - New Index: ${currIndex}`);
			});

			return currLetter;
		}
		return null;
	}

	function encryptReflector(index) {
		// console.log(machineSettings.selectedReflector);
		return machineSettings.selectedReflector[index];
	}

	function encryptMsg(msg) {
		let encryptedMsg = "";

		msg.split("").forEach((char) => {
			encryptedMsg += encryptRotors(encryptReflector(encryptRotors(char, "forward")), "backwards");
		});
		return encryptedMsg;
	}

	return (
		<div className="bg-gray-50 p-24 border-4 border-gray-400 rounded-4xl">
			<h1 className="text-3xl place-self-center mb-4">Encrypt message</h1>
			<div
				id="encrypt-container"
				className="flex flex-col gap-4 items-center justify-center text-2xl"
			>
				<form className="p-4 flex flex-col gap-4">
					<div
						id="container-userInput"
						className="flex items-center gap-4 justify-start"
					>
						<label
							htmlFor="userInput"
							className="w-24"
						>
							Message:
						</label>
						<input
							id="userInput"
							name="userInput"
							type="text"
							placeholder="Message.."
							className="border-2 rounded-lg p-2 w-100"
							spellCheck="false"
							onChange={(e) => {
								handleChange(e);
							}}
						/>
					</div>
					<div
						id="container-output"
						className="flex items-center gap-4 justify-start"
					>
						<label
							htmlFor="output"
							className="w-24"
						>
							Output:
						</label>
						<span
							id="output"
							className="text-2xl h-[52px] border-2 rounded-lg w-100 px-2 flex items-center"
						>
							<p className="block w-full">{outputText}</p>
						</span>
						<button
							className="border-2 rounded-lg self-stretch px-3 flex items-center justify-center aspect-square cursor-pointer hover:brightness-90 bg-white"
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
				</form>

				<ToastContainer />
			</div>
		</div>
	);
};

export default Encrypt;
