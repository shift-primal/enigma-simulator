const Settings = ({ machineSettings, setMachineSettings }) => {
	return (
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
	);
};

export default Settings;
