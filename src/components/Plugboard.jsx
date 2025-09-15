import { useEffect, useState } from "react";

const Plugboard = () => {
	const [linkedPlugs, setLinkedPlugs] = useState([]);
	const [selectedPlug, setSelectedPlug] = useState([]);

	useEffect(() => {
		if (selectedPlug.length >= 2) {
			setLinkedPlugs((prev) => [...prev, selectedPlug]);
			setSelectedPlug([]);
		}
	}, [selectedPlug]);

	useEffect(() => {
		if (linkedPlugs.length > 0) {
			console.log(linkedPlugs);
		}
	}, [linkedPlugs]);

	const letters = "QWERTZUIOASDFGHJKPYXCVBNML".split("");

	console.log("State change", selectedPlug);

	function letterClasses(letter) {
		let classes = "text-lg text-center border-2 p-2 flex flex-col cursor-pointer outline-green-400 hover:outline-2";

		if (linkedPlugs.length >= 1) {
			linkedPlugs.forEach((plug) => {
				if (plug.includes(letter)) {
					classes += " bg-green-400";
				}
			});
		}

		if (selectedPlug.includes(letter)) {
			classes += " bg-green-400";
		}

		return classes;
	}

	function checkForDuplicates(inputChar) {
		let occupiedChars = [];
		linkedPlugs.forEach((plug) => {
			plug.forEach((char) => {
				occupiedChars.push(char);
			});
		});
		if (occupiedChars.includes(inputChar)) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div
			id="plugboard-container"
			className="grid grid-cols-9 gap-y-4 gap-x-20 place-items-center"
		>
			{letters.map((letter) => {
				return (
					<button
						key={letter}
						id={`plugboard-letter-${letter}`}
						className={letterClasses(letter)}
						onClick={() => {
							if (letter !== selectedPlug[0] && !checkForDuplicates(letter)) {
								setSelectedPlug((prev) => [...prev, letter]);
							} else {
								setSelectedPlug([]);
							}
						}}
					>
						<span>{letter}</span>
						<div className="border-t-1 my-1"></div>
						<span>○</span>
						<span>○</span>
					</button>
				);
			})}
		</div>
	);
};

export default Plugboard;
