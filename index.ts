import express from 'express';
const app = express();
import { BMICalculator } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';
// import { calculateExercise } from './exerciseCalculator';
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	try {
		const queryObject = req.query;
		BMICalculator(Number(queryObject.weight), Number(queryObject.height));
	}
	catch (error) {
		if (error instanceof Error) {
			console.log("Error: ", error.message);
			res.status(422).end(`Error: ${error.message}`);
		}
	}
});

app.post('/exercises', (req, res) => {
	try {
		const { daily_exercises, target } = req.body;
		if (!daily_exercises || !target)
			throw new Error("parameters missing");
		const result = calculateExercise(daily_exercises, target);
		res.send(result);
	}
	catch (error) {
		let err = "Error! ";
		if (error instanceof Error)
			err += error.message;
		res.status(422).end(`${err}`);
	}


})

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
