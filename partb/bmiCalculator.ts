// interface BMI {
// 	height: number,
// 	weight: number
// }

// const parseArgs = (args: Array<string>): BMI => {
// 	if (args.length < 4) throw new Error('Not enough arguments');
// 	if (args.length > 4) throw new Error('Too many arguments');

// 	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
// 		return {
// 			height: Number(args[2]),
// 			weight: Number(args[3])
// 		}
// 	}
// 	else
// 		throw new Error("Provided values weren't numbers");
// }

const BMICalculator = (weight: number, height: number) => {
	if (Number.isNaN(weight) || Number.isNaN(height)) {
		throw new Error("malformatted parameters");
	}

	const totalBMI = Math.round(weight / Math.pow(height / 100, 2));

	if (totalBMI < 16)
		return console.log("The BMI category is: Underweight (Severe thinness)");
	else if (totalBMI >= 16 && totalBMI < 16.9)
		return console.log("The BMI category is: Underweight (Moderate thinness)");
	else if (totalBMI >= 17 && totalBMI < 18.4)
		return console.log("The BMI category is: Underweight (Mild thinness)");
	else if (totalBMI >= 18.5 && totalBMI < 24.9)
		return console.log("The BMI category is: Normal range");
	else if (totalBMI >= 25 && totalBMI < 29.9)
		return console.log("The BMI category is: Overweight (Pre-obese)");
	else if (totalBMI >= 30 && totalBMI < 34.9)
		return console.log("The BMI category is: Obese (Class I)");
	else if (totalBMI >= 35 && totalBMI < 39.9)
		return console.log("The BMI category is: Obese (Class II)");
	else if (totalBMI >= 40)
		return console.log("The BMI category is: Obese (Class III)");
};

// try {
// 	const { weight, height } = parseArgs(process.argv)
// 	BMICalculator(weight, height, "The BMI category is: ")
// } catch (error) {
// 	let errorMsg = 'Error: '
// 	if (error instanceof Error) {
// 		errorMsg += error.message
// 	}
// 	console.log(errorMsg);
// }

export { BMICalculator };
