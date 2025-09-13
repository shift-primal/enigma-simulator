import { alphabet } from "./baseData";

export function shiftRotor(machineSettings) {
	//console.log("SHIFTING ROTOR!");
	return {
		...machineSettings,
		rotors: {
			...machineSettings.rotors,
			right: {
				...machineSettings.rotors.right,
				position: (machineSettings.rotors.right.position + 1) % 26,
			},
		},
	};
}

export function encryptRotors(char, direction, machineSettings) {
	if (direction === "forward") {
		//console.log("Starting FORWARDS rotor encryption...");
		//console.log("Settings: ", machineSettings);

		let currIndex = alphabet.indexOf(char);
		let currLetter = alphabet[currIndex];
		//console.log(`Starting letter: ${currLetter} - Index: ${currIndex}`);

		const rotorsArr = Object.entries(machineSettings.rotors).sort((a, b) => a[1].id - b[1].id);
		//console.log("Rotors:", rotorsArr);

		rotorsArr.forEach((rotor) => {
			const rotorWiring = rotor[1].selectedRotor.wiring;
			const rotorPos = rotor[1].position;
			const offsetIndex = (currIndex + rotorPos) % 26;

			currLetter = rotorWiring[offsetIndex];

			currIndex = (alphabet.indexOf(currLetter) - rotorPos + 26) % 26;
			currLetter = alphabet[currIndex];

			//console.log(`Going through rotor: ${rotor[0]} - New Letter: ${currLetter} - New Index: ${currIndex}`);
		});

		return currIndex;
	} else if (direction === "backwards") {
		//console.log("Starting BACKWARDS rotor encryption...");
		//console.log("Settings: ", machineSettings);

		let currIndex = alphabet.indexOf(char);
		let currLetter = alphabet[currIndex];
		//console.log(`Starting letter: ${currLetter} - Index: ${currIndex}`);

		const rotorsArr = Object.entries(machineSettings.rotors);
		//console.log("Rotors:", rotorsArr);

		rotorsArr.forEach((rotor) => {
			const rotorWiring = rotor[1].selectedRotor.wiring;
			const rotorPos = rotor[1].position;
			const offsetIndex = (currIndex + rotorPos) % 26;
			const wirePosition = rotorWiring.indexOf(alphabet[offsetIndex]);

			currIndex = (wirePosition - rotorPos + 26) % 26;
			currLetter = alphabet[currIndex];

			//console.log(`Going through rotor: ${rotor[0]} - New Letter: ${currLetter} - New Index: ${currIndex}`);
		});

		return currLetter;
	}
	return null;
}

export function encryptReflector(index, machineSettings) {
	return machineSettings.selectedReflector[index];
}

export function encryptMsg(msg, currentSettings) {
	let encryptedMsg = "";

	msg.split("").forEach((char, i) => {
		if (i % 5 === 0) {
			encryptedMsg += " ";
		}
		currentSettings = shiftRotor(currentSettings);
		encryptedMsg += encryptRotors(
			encryptReflector(encryptRotors(char, "forward", currentSettings), currentSettings),
			"backwards",
			currentSettings
		);
	});

	return {
		encryptedMsg,
		finalSettings: currentSettings,
	};
}
