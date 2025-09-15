import { Fragment } from "react";
import { alphabet } from "../utils/baseData";

const Settings = ({ baseSettings, setBaseSettings, currentRotorPositions }) => {
	return (
		<div
			id="settings-container"
			className="flex flex-col items-center justify-center gap-y-8"
		>
			<div className="flex flex-col items-center gap-y-4 p-2">
				<h2>Ring settings</h2>
				<form className="flex justify-center gap-8 text-xl w-fit">
					{Object.entries(baseSettings.rotors).map((rotor, i) => {
						return (
							<Fragment key={`ring-${rotor[0]}`}>
								{i === 0 ? null : <div className="border-l-2 opacity-25"></div>}
								<div className="flex flex-col gap-1 px-2 py-1">
									<label
										htmlFor={`offset-rotor-${rotor[0]}`}
										className="capitalize text-center"
									>
										{rotor[0]}
									</label>

									<select
										id={`offset-rotor-${rotor[0]}`}
										className="focus:outline-none w-fit self-center"
										value={baseSettings.rotors[rotor[0]].ringSetting}
										onChange={(e) => {
											setBaseSettings((prev) => ({
												...prev,
												rotors: {
													...prev.rotors,
													[rotor[0]]: {
														...prev.rotors[rotor[0]],
														ringSetting: parseInt(e.target.value),
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
													{alphabet[i]}
												</option>
											);
										})}
									</select>
								</div>
							</Fragment>
						);
					})}
				</form>
			</div>
			<div className="border-t-2 opacity-25 self-stretch mt-4"></div>
			<div className="flex flex-col items-center gap-y-4 p-2">
				<h2>Rotor offset</h2>
				<form className="flex justify-center gap-8 text-xl w-fit">
					{Object.entries(baseSettings.rotors).map((rotor, i) => {
						return (
							<Fragment key={`offset-${rotor[0]}`}>
								{i === 0 ? null : <div className="border-l-2 opacity-25"></div>}
								<div className={`flex flex-col gap-1 px-2 py-1`}>
									<label
										htmlFor={`offset-rotor-${rotor[0]}`}
										className="capitalize text-center"
									>
										{rotor[0]}
									</label>

									<select
										id={`offset-rotor-${rotor[0]}`}
										className="focus:outline-none w-fit self-center"
										value={baseSettings.rotors[rotor[0]].position}
										onChange={(e) => {
											setBaseSettings((prev) => ({
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
													{alphabet[i]}
												</option>
											);
										})}
									</select>

									<div className="text-sm text-center text-gray-600 w-20">
										Current: {alphabet[currentRotorPositions[rotor[0]]]}
									</div>
								</div>
							</Fragment>
						);
					})}
				</form>
			</div>
		</div>
	);
};

export default Settings;
