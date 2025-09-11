import { shuffle } from "fast-shuffle";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Slide } from "react-toastify/unstyled";

const Encrypt = () => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");

	// Rotor høyre - pin 1 -> pin 4 rotor midt (A -> D)

	// Rotor signal (Input -> Plugboard -> Rotor Right -> Rotor Mid -> Rotor Left -> Reflector -> Rotor Left -> Rotor Mid -> Rotor Right -> Plugboard -> Output)

	/* 
    
    Keyboard Input: A
    Rotors Position: AAA
    Plugboard Encryption: A
    Wheel 3 Encryption: B
    Wheel 2 Encryption: J
    Wheel 1 Encryption: Z
    Reflector Encryption: T
    Wheel 1 Encryption: L
    Wheel 2 Encryption: K
    Wheel 3 Encryption: U
    Plugboard Encryption: U
    Output (Lampboard): U

    */

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

	function shiftRotor() {}

	// function encryptRotors(char) {
	// 	const startIndex = alphabet.indexOf(char);
	// 	const startLetter = alphabet[startIndex];
	// 	console.log(`Starting letter: ${startLetter} - Index: ${startIndex}`);

	// 	let currLetter = machineSettings.rotors.right.selectedRotor.wiring[startIndex];
	// 	let currIndex = alphabet.indexOf(currLetter);
	// 	console.log(`Going through rotor: 1 - New Letter: ${currLetter} - New Index: ${currIndex}`);

	// 	currLetter = machineSettings.rotors.mid.selectedRotor.wiring[currIndex];
	// 	currIndex = alphabet.indexOf(currLetter);
	// 	console.log(`Going through rotor: 2 - New Letter: ${currLetter} - New Index: ${currIndex}`);

	// 	currLetter = machineSettings.rotors.left.selectedRotor.wiring[currIndex];
	// 	currIndex = alphabet.indexOf(currLetter);
	// 	console.log(`Going through rotor: 3 - New Letter: ${currLetter} - New Index: ${currIndex}`);

	// 	return currIndex;
	// }

	function encryptRotors(char) {
		let currIndex = alphabet.indexOf(char);
		let currLetter = alphabet[currIndex];
		console.log(`Starting letter: ${currLetter} - Index: ${currIndex}`);

		const rotorsArr = Object.entries(machineSettings.rotors).sort((a, b) => a[1].id - b[1].id);

		rotorsArr.forEach((rotor) => {
			const rotorPos = rotor[1].position;
			const rotorWiring = rotor[1].selectedRotor.wiring;
			currLetter = rotorWiring[currIndex + rotorPos];
			currIndex = alphabet.indexOf(currLetter);
			console.log(`Going through rotor: ${rotor[0]} - New Letter: ${currLetter} - New Index: ${currIndex}`);
		});

		return currIndex;
	}

	function encryptRotorsReverse(char) {
		let currIndex = machineSettings.rotors.left.selectedRotor.wiring.indexOf(char);
		let currLetter = alphabet[currIndex];
		// console.log(`Going through rotor: 3 - New Letter: ${currLetter} - New Index: ${currIndex}`);

		currIndex = machineSettings.rotors.mid.selectedRotor.wiring.indexOf(currLetter);
		currLetter = alphabet[currIndex];
		// console.log(`Going through rotor: 2 - New Letter: ${currLetter} - New Index: ${currIndex}`);

		currIndex = machineSettings.rotors.right.selectedRotor.wiring.indexOf(currLetter);
		currLetter = alphabet[currIndex];
		// console.log(`Going through rotor: 1 - New Letter: ${currLetter} - New Index: ${currIndex}`);

		return currLetter;
	}

	function encryptReflector(index) {
		console.log(index);
		console.log(machineSettings.selectedReflector);
		return machineSettings.selectedReflector[index];
	}

	function encryptMsg(msg) {
		let encryptedMsg = "";

		msg.split("").forEach((char) => {
			encryptedMsg += encryptRotorsReverse(encryptReflector(encryptRotors(char)));
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
