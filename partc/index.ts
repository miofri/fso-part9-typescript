import express from 'express';
import diagnoseService from './services/diagnoseService';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/api/diagnoses', (_req, res) => {
	console.log(diagnoseService.getDiagnosesEntries());

	res.send(diagnoseService.getDiagnosesEntries());
});

app.get('/api/patients', (_req, res) => {
	res.send(diagnoseService.getPatientEntries());
});

app.post('/api/patients', (req, res) => {
	try {
		const reqBody: unknown = req.body;
		const checkEntry = diagnoseService.addPatientCheck(reqBody);

		const newPatientEntry = diagnoseService.addPatient(checkEntry);

		res.json(newPatientEntry);
	} catch (error) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			console.log("Error: ", error);
		}
		res.status(400).send(errorMessage);
	}

});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
