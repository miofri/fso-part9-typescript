import express from 'express';
import patientRouter from './routes/patient';
import cors from 'cors';
import patientService from './services/patientService';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/patient', patientRouter);
const PORT = 3000;

app.get('/api/diagnoses', (_req, res) => {
	res.send(patientService.getDiagnostics());
});

app.get('/api/patients', (_req, res) => {
	res.send(patientService.getPatients());
});

app.listen(PORT, () => {
	console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
