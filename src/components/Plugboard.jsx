import { useState } from "react";

import "@xyflow/react/dist/style.css";
import PlugButton from "./PlugButton";

const Plugboard = ({ linkedPlugs, setLinkedPlugs }) => {
	const [selectedPlug, setSelectedPlug] = useState([]);

	const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

	function handlePlugClick(letter) {
		if (letter !== selectedPlug[0] && !checkForDuplicates(letter)) {
			const newSelection = [...selectedPlug, letter];

			if (newSelection.length >= 2 && linkedPlugs.length < 10) {
				setLinkedPlugs((prev) => [...prev, newSelection]);
				setSelectedPlug([]);
			} else if (newSelection.length >= 2 && linkedPlugs.length >= 10) {
				alert("Plugboard limit reached! Max 10 connections");
				setSelectedPlug([]);
			} else {
				setSelectedPlug(newSelection);
			}
		} else {
			setSelectedPlug([]);
		}
	}

	function selectedClasses(letter) {
		if (selectedPlug.includes(letter)) {
			return " outline-dashed";
		}
	}

	function dotsClasses(letter) {
		const colorClasses = [
			"!bg-red-600",
			"!bg-yellow-400",
			"!bg-green-500",
			"!bg-cyan-300",
			"!bg-cyan-500",
			"!bg-blue-600",
			"!bg-purple-400",
			"!bg-pink-400",
			"!bg-amber-800",
			"!bg-gray-600",
		];

		let classes = "border-1 w-3 aspect-square rounded-full";

		if (linkedPlugs.length >= 1) {
			linkedPlugs.forEach((plug, index) => {
				if (plug.includes(letter)) {
					const colorClass = colorClasses[index];
					classes += ` ${colorClass}`;
				}
			});
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
		<div className="flex flex-col items-center justify-center gap-y-4">
			<h1 className="text-2xl">Plugboard</h1>

			<div className="flex gap-x-10 justify-center">
				{letters.slice(0, 10).map((letter) => (
					<PlugButton
						key={letter}
						letter={letter}
						selectedClasses={selectedClasses}
						dotsClasses={dotsClasses}
						handlePlugClick={handlePlugClick}
					/>
				))}
			</div>

			<div className="flex gap-x-10 justify-center">
				{letters.slice(10, 19).map((letter) => (
					<PlugButton
						key={letter}
						letter={letter}
						selectedClasses={selectedClasses}
						dotsClasses={dotsClasses}
						handlePlugClick={handlePlugClick}
					/>
				))}
			</div>

			<div className="flex gap-x-10 justify-center">
				{letters.slice(19, 26).map((letter) => (
					<PlugButton
						key={letter}
						letter={letter}
						selectedClasses={selectedClasses}
						dotsClasses={dotsClasses}
						handlePlugClick={handlePlugClick}
					/>
				))}
			</div>

			<h2 className="text-xl mt-2">Plugboard connections: {linkedPlugs.length}/10</h2>
		</div>
	);
};

export default Plugboard;
