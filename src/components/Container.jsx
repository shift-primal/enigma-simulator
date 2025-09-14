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
	const [baseSettings, setBaseSettings] = useState(defaultSettings);
	const [currentRotorPositions, setCurrentRotorPositions] = useState({
		// Just the positions after encryption
		left: 0,
		mid: 0,
		right: 0,
	});

	useEffect(() => {
		if (inputText) {
			handleOutput(inputText);
		} else {
			setOutputText("");
			// Reset rotor positions when input is cleared
			setCurrentRotorPositions({
				left: baseSettings.rotors.left.position,
				mid: baseSettings.rotors.mid.position,
				right: baseSettings.rotors.right.position,
			});
		}
	}, [inputText, baseSettings]); // Only depend on inputText and baseSettings

	function handleOutput(inputText) {
		if (cleanInput(inputText)) {
			setOutputText("Invalid input detected.");
			return;
		}

		const currentSettings = {
			...baseSettings,
			rotors: {
				left: { ...baseSettings.rotors.left },
				mid: { ...baseSettings.rotors.mid },
				right: { ...baseSettings.rotors.right },
			},
		};

		const result = encryptMsg(inputText, currentSettings);
		setOutputText(result.encryptedMsg);

		setCurrentRotorPositions({
			left: result.finalSettings.rotors.left.position,
			mid: result.finalSettings.rotors.mid.position,
			right: result.finalSettings.rotors.right.position,
		});
	}

	return (
		<div className="bg-gray-50 p-24 border-4 border-gray-400 rounded-4xl">
			<Settings
				machineSettings={baseSettings}
				setMachineSettings={setBaseSettings}
				currentRotorPositions={currentRotorPositions}
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
				/>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Container;
