export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const rotorsInfo = {
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

export const reflectors = {
	reflectorA: "EJMZALYXVBWFCRQUONTSPIKHGD".split(""),
	reflectorB: "YRUHQSLDPXNGOKMIEBFZCWVJAT".split(""),
	reflectorC: "FVPJIAOYEDRZXWGCTKUQSBNMHL".split(""),
};

export const defaultSettings = {
	rotors: {
		left: { selectedRotor: rotorsInfo.rotorI, position: 0, ringSetting: 0, id: 2 },
		mid: { selectedRotor: rotorsInfo.rotorII, position: 0, ringSetting: 0, id: 1 },
		right: { selectedRotor: rotorsInfo.rotorIII, position: 0, ringSetting: 0, id: 0 },
	},

	selectedReflector: reflectors.reflectorB,
};
