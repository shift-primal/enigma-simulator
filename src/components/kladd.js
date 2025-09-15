while (numbers.any === null) {
	let randomIndex = getRandomNumber(numbers[0], numbers.length - 1);

	if (!numbers.includes(randomIndex)) {
		newBoard[num] = numbers[randomIndex];
	}
}
