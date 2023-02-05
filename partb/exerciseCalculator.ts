interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercise = (arr: Array<number>, target: number): Result => {
	let trainingDays = 0;
	arr.forEach(element => {
		if (typeof element !== "number")
			throw new Error("malformatted parameters");
		if (element > 0)
			trainingDays++;
	});

	const len = arr.length;
	const average = arr.reduce((a, b) => a + b, 0) / len;
	let rating = 0;
	let ratingDescription = '';
	let success = false;

	if (average >= target / 2 && average < target) {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	}
	else if (average < target / 2) {
		rating = 1;
		ratingDescription = 'try harder next week!';
	}
	else {
		rating = 3;
		ratingDescription = 'great job, you\'ve met the target!';
		success = true;
	}

	return {
		periodLength: len,
		trainingDays: trainingDays,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: average
	};
};

// try {
// 	const target = Number(process.argv[2]);
// 	const argvArray = [];
// 	for (let index = 3; index < process.argv.length; index++) {
// 		argvArray.push(Number(process.argv[index]));
// 	}

// 	console.log(calculateExercise(argvArray, target));

// } catch (error: unknown) {
// 	if (error instanceof Error) {
// 		console.log("Error: ", error.message);
// 	}
// }

export { calculateExercise };
