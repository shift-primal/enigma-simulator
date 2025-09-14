import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { defaultSettings } from "../utils/baseData";
import { encryptMsg } from "../utils/enigmaMachine";
import { handleClipboard } from "../utils/clipboard";
import { sanitizeInput } from "../utils/cleanInput";

const Encrypt = () => {
	const [inputText, setInputText] = useState("");
	const [outputText, setOutputText] = useState("");

	const [machineSettings, setMachineSettings] = useState(defaultSettings);

	useEffect(() => {
		console.log(machineSettings);
	}, [machineSettings]);

	useEffect(() => {
		inputText ? handleOutput(inputText) : null;
	}, [inputText]);

	useEffect(() => {
		if (inputText.length === 0) {
			setOutputText("");
			setMachineSettings(defaultSettings);
		}
	}, [inputText]);

	function handleOutput(msg) {
		if (sanitizeInput(msg)) {
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

		const result = encryptMsg(msg, currentSettings);
		setOutputText(result.encryptedMsg);
		// setMachineSettings(result.finalSettings);
	}

	return (
		<div className="bg-gray-50 p-24 border-4 border-gray-400 rounded-4xl">
			<div
				id="settings-container"
				className="flex items-center justify-center"
			>
				<form className="mb-8 flex justify-center gap-8 text-xl w-fit">
					{Object.entries(machineSettings.rotors).map((rotor) => {
						return (
							<div
								key={rotor[0]}
								className="flex gap-1 border-2 px-2 py-1"
							>
								<label
									htmlFor={`offset-rotor-${rotor[0]}`}
									className="capitalize"
								>
									{rotor[0]}
								</label>

								<select
									id={`offset-rotor-${rotor[0]}`}
									className="focus:outline-none"
									value={machineSettings.rotors[rotor[0]].position}
									onChange={(e) => {
										setMachineSettings((prev) => ({
											...prev,
											rotors: {
												...prev.rotors,
												[rotor[0]]: {
													...prev.rotors[rotor[0]],
													position: parseInt(e.target.value),
												},
											},
										}));
									}}
								>
									{new Array(26).fill(0).map((num, i) => {
										return (
											<option
												key={i}
												value={i}
											>
												{i}
											</option>
										);
									})}
								</select>
							</div>
						);
					})}
				</form>
			</div>
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
							value={inputText}
							id="userInput"
							name="userInput"
							type="text"
							placeholder="Message.."
							className="border-2 rounded-lg p-2 w-100"
							spellCheck="false"
							onChange={(e) => {
								e.preventDefault();
								setInputText(e.target.value.toUpperCase());
							}}
						/>
					</div>
					<div
						id="container-output"
						className="flex items-center gap-4 justify-start"
					>
						<label className="w-24">Output:</label>
						<span
							id="output"
							className="text-2xl h-[52px] border-2 rounded-lg w-100 px-2 flex items-center"
						>
							<p className="block w-full">{outputText}</p>
						</span>
						<button
							className="border-2 rounded-lg self-stretch px-3 flex items-center justify-center aspect-square cursor-pointer hover:brightness-90 bg-white"
							onClick={(e) => {
								e.preventDefault();
								handleClipboard(outputText);
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
