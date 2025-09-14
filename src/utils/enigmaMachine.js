import { alphabet } from "./baseData";

function checkRotorShift(machineSettings) {
	Object.entries(machineSettings.rotors).forEach((rotor) => {
		const currentRotor = rotor[0];
		const turnOverValue = alphabet.indexOf(rotor[1].selectedRotor.notch);
		const currentPos = rotor[1].position;

		console.log(`currentRotor: ${currentRotor}`);
		console.log(`currentPos: ${currentPos}`);
		console.log(`turnOverValue: ${turnOverValue}`);

		if (currentPos === turnOverValue) {
			console.log(currentRotor, "here yes");
			return currentRotor;
		}
	});
}

function shiftRotors(machineSettings) {
	let newSettings = { ...machineSettings };
	if (checkRotorShift(newSettings) !== "right") {
		console.log("!!!TURNING OVER RIGHT!!!");

		newSettings = {
			...machineSettings,
			rotors: {
				...machineSettings.rotors,
				right: {
					...machineSettings.rotors.right,
					position: (machineSettings.rotors.right.position + 1) % 26,
				},
			},
		};
	} else if (checkRotorShift(newSettings) === "right") {
		console.log("!!!TURNING OVER MID!!!");

		newSettings = {
			...machineSettings,
			rotors: {
				...machineSettings.rotors,
				mid: {
					...machineSettings.rotors.mid,
					position: (machineSettings.rotors.mid.position + 1) % 26,
				},
				right: {
					...machineSettings.rotors.right,
					position: (machineSettings.rotors.right.position + 1) % 26,
				},
			},
		};
	} else if (checkRotorShift(newSettings) === "mid") {
		console.log("!!!TURNING OVER LEFT!!!");

		newSettings = {
			...machineSettings,
			rotors: {
				...machineSettings.rotors,
				left: {
					...machineSettings.rotors.left,
					position: (machineSettings.rotors.left.position + 1) % 26,
				},
				mid: {
					...machineSettings.rotors.mid,
					position: (machineSettings.rotors.mid.position + 1) % 26,
				},
				right: {
					...machineSettings.rotors.right,
					position: (machineSettings.rotors.right.position + 1) % 26,
				},
			},
		};
	}
	return newSettings;
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

export function encryptMsg(msg, machineSettings) {
	let encryptedMsg = "";
	let currentSettings = {
		...machineSettings,
		rotors: {
			left: { ...machineSettings.rotors.left },
			mid: { ...machineSettings.rotors.mid },
			right: { ...machineSettings.rotors.right },
		},
	};

	msg.split("").forEach((char, i) => {
		if (i % 5 === 0) {
			encryptedMsg += " ";
		}
		currentSettings = shiftRotors(currentSettings, char);
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
