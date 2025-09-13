import { alphabet } from "./baseData";

export function cleanInput(msg) {
	return msg.split("").some((char) => {
		return !alphabet.includes(char);
	});
}
