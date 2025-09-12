import { alphabet } from "./baseData";

export function sanitizeInput(msg) {
	return msg.split("").some((char) => {
		return !alphabet.includes(char);
	});
}
