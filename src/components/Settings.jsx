const Settings = ({ baseSettings, setBaseSettings, currentRotorPositions }) => {
	return (
		<div
			id="settings-container"
			className="flex flex-col items-center justify-center gap-y-4"
		>
			<h2>Rotor offset</h2>
			<form className="mb-8 flex justify-center gap-8 text-xl w-fit">
				{Object.entries(baseSettings.rotors).map((rotor) => {
					return (
						<div
							key={rotor[0]}
							className="flex flex-col gap-1 border-2 px-2 py-1"
						>
							<label
								htmlFor={`offset-rotor-${rotor[0]}`}
								className="capitalize text-center"
							>
								{rotor[0]}
							</label>

							<select
								id={`offset-rotor-${rotor[0]}`}
								className="focus:outline-none"
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
											{i}
										</option>
									);
								})}
							</select>

							<div className="text-sm text-center text-gray-600">Current: {currentRotorPositions[rotor[0]]}</div>
						</div>
					);
				})}
			</form>
			<h2>Ring settings</h2>
			<form className="mb-8 flex justify-center gap-8 text-xl w-fit">
				{Object.entries(baseSettings.rotors).map((rotor) => {
					return (
						<div
							key={rotor[0]}
							className="flex flex-col gap-1 border-2 px-2 py-1"
						>
							<label
								htmlFor={`offset-rotor-${rotor[0]}`}
								className="capitalize text-center"
							>
								{rotor[0]}
							</label>

							<select
								id={`offset-rotor-${rotor[0]}`}
								className="focus:outline-none"
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
	);
};

export default Settings;
