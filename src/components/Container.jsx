import { ToastContainer } from "react-toastify";
import Input from "./Input";
import Output from "./Output";
import Settings from "./Settings";
import { useEffect, useState } from "react";
import { defaultSettings } from "../utils/baseData";
import { cleanInput } from "../utils/cleanInput";
import { encryptMsg } from "../utils/enigmaMachine";

const Container = () => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");
	const [machineSettings, setMachineSettings] = useState(defaultSettings);

	useEffect(() => {
		inputText ? handleOutput(inputText) : null;
	}, [inputText]);

	function handleOutput(inputText) {
		if (cleanInput(inputText)) {
			setOutputText("Invalid input detected.");
			return;
		}

		const currentSettings = {
			...machineSettings,
			rotors: {
				left: { ...machineSettings.rotors.left },
				mid: { ...machineSettings.rotors.mid },
				right: { ...machineSettings.rotors.right },
			},
		};

		const result = encryptMsg(inputText, currentSettings);
		setOutputText(result.encryptedMsg);
		setMachineSettings(result.finalSettings);
	}

	return (
		<div className="bg-gray-50 p-24 border-4 border-gray-400 rounded-4xl">
			<Settings
				machineSettings={machineSettings}
				setMachineSettings={setMachineSettings}
			/>
			<div
				id="encrypt-container"
				className="flex flex-col gap-4 items-center justify-center text-2xl"
			>
				<h1 className="text-3xl place-self-center mb-4">Encrypt message</h1>
				<Input
					inputText={inputText}
					setInputText={setInputText}
				/>
				<Output
					inputText={inputText}
					outputText={outputText}
					setOutputText={setOutputText}
					setMachineSettings={setMachineSettings}
				/>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Container;
