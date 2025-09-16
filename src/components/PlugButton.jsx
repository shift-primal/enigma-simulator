const PlugButton = ({ letter, selectedClasses, dotsClasses, handlePlugClick }) => {
	return (
		<button
			key={letter}
			id={`plugboard-letter-${letter}`}
			className={`w-10 text-lg text-center border-2 p-2 flex flex-col cursor-pointer outline-offset-2 hover:scale-110 rounded-lg ${selectedClasses(
				letter
			)}`}
			onClick={() => handlePlugClick(letter)}
		>
			<span>{letter}</span>
			<div className="border-t-1 my-1"></div>
			<div className="place-self-center flex flex-col gap-y-2">
				<div className={dotsClasses(letter)}></div>
				<div className={dotsClasses(letter)}></div>
			</div>
		</button>
	);
};

export default PlugButton;
