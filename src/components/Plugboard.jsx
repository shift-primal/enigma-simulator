import { useState } from "react";

const Plugboard = () => {
	const [linkedPlugs, setLinkedPlugs] = useState({});
	const [selectedPlug, setSelectedPlug] = useState(null);

	console.log(linkedPlugs);

	const letters = "QWERTZUIOASDFGHJKPYXCVBNML".split("");

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
						className="text-lg text-center border-2 p-2 flex flex-col cursor-pointer hover:border-green-500 hover:text-green-500"
						onClick={setSelectedPlug}
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
