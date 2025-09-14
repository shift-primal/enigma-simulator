import { alphabet } from "./baseData";

function shiftRotor(machineSettings, rotorsToShift) {
	// console.log("Shifting rotor(s):", rotorsToShift);

	if (Array.isArray(rotorsToShift)) {
		let updatedSettings = { ...machineSettings };

		rotorsToShift.forEach((currRotor) => {
			updatedSettings = {
				...updatedSettings,
				rotors: {
					...updatedSettings.rotors,
					[currRotor]: {
						...updatedSettings.rotors[currRotor],
						position: (updatedSettings.rotors[currRotor].position + 1) % 26,
					},
				},
			};
		});

		return updatedSettings;
	} else {
		return {
			...machineSettings,
			rotors: {
				...machineSettings.rotors,
				[rotorsToShift]: {
					...machineSettings.rotors[rotorsToShift],
					position: (machineSettings.rotors[rotorsToShift].position + 1) % 26,
				},
			},
		};
	}
}

function checkRotorsToShift(machineSettings) {
	const rightRotor = machineSettings.rotors.right;
	const midRotor = machineSettings.rotors.mid;

	const rightTurnoverPos = alphabet.indexOf(rightRotor.selectedRotor.notch);
	const midTurnoverPos = alphabet.indexOf(midRotor.selectedRotor.notch);

	let rotorsToAdvance = ["right"];

	if (rightRotor.position === rightTurnoverPos) {
		rotorsToAdvance.push("mid");

		if (midRotor.position === midTurnoverPos) {
			rotorsToAdvance.push("left");
		}
	} else if (midRotor.position === midTurnoverPos) {
		rotorsToAdvance.push("mid", "left");
	}

	return rotorsToAdvance;
}

function encryptRotors(char, direction, machineSettings) {
	if (direction === "forward") {
		// console.log("Encrypting forward")
		let currIndex = alphabet.indexOf(char);
		let currLetter = alphabet[currIndex];

		const rotorsArr = Object.entries(machineSettings.rotors).sort((a, b) => a[1].id - b[1].id);

		rotorsArr.forEach((rotor) => {
			const rotorWiring = rotor[1].selectedRotor.wiring;
			const rotorPos = rotor[1].position;
			const ringSetting = rotor[1].ringSetting;
			const offsetIndex = (currIndex + rotorPos - ringSetting) % 26;

			currLetter = rotorWiring[offsetIndex];
			currIndex = (alphabet.indexOf(currLetter) - rotorPos + ringSetting + 26) % 26;
			currLetter = alphabet[currIndex];
		});

		return currIndex;
	} else if (direction === "backwards") {
		// console.log("Encrypting backwards")
		let currIndex = alphabet.indexOf(char);
		let currLetter = alphabet[currIndex];

		const rotorsArr = Object.entries(machineSettings.rotors).sort((a, b) => b[1].id - a[1].id);

		rotorsArr.forEach((rotor) => {
			const rotorWiring = rotor[1].selectedRotor.wiring;
			const rotorPos = rotor[1].position;
			const ringSetting = rotor[1].ringSetting;
			const offsetIndex = (currIndex + rotorPos - ringSetting + 26) % 26;
			const wirePosition = rotorWiring.indexOf(alphabet[offsetIndex]);

			currIndex = (wirePosition - rotorPos + ringSetting + 26) % 26;
			currLetter = alphabet[currIndex];
		});

		return currLetter;
	}
	return null;
}

function encryptReflector(index, machineSettings) {
	// console.log("Going through reflector")
	return machineSettings.selectedReflector[index];
}

export function encryptMsg(msg, currentSettings) {
	// console.log("Starting encryption...")
	let encryptedMsg = "";

	msg.split("").forEach((char, i) => {
		if (i % 5 === 0) {
			encryptedMsg += " ";
		}

		const rotorsToShift = checkRotorsToShift(currentSettings);
		currentSettings = shiftRotor(currentSettings, rotorsToShift);

		const forwardResult = encryptRotors(char, "forward", currentSettings);
		const reflectorResult = encryptReflector(forwardResult, currentSettings);
		const backwardResult = encryptRotors(reflectorResult, "backwards", currentSettings);

		encryptedMsg += backwardResult;
	});

	return {
		encryptedMsg,
		finalSettings: currentSettings,
	};
}
