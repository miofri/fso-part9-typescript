/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send('Fetching all diaries');
});

router.post('/', (req, res) => {
	const newPatientBody = patientService.newEntry(req.body);

	const newPatient = patientService.addPatient(newPatientBody);

	res.json(newPatient);
});

export default router;
