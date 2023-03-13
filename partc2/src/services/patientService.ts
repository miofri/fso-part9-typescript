import diagnoses from '../../data/diagnoses.json';
import { Diagnostics, NewPatients, Patients } from '../types';
import patients from '../../data/patients.json';
import { NoSSNPatients } from '../types';
import { v4 as uuidv4 } from 'uuid';
import parser from '../utils';

const getDiagnostics = (): Diagnostics[] => {
	return diagnoses;
};

const getPatients = (): NoSSNPatients[] => {
	const nonSensitivePatients = patients.map(
		({ id, name, dateOfBirth, gender, occupation }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation
		})
	);

	return nonSensitivePatients as NoSSNPatients[];
};

const addPatient = (entry: NewPatients): Patients => {
	const id = uuidv4();
	const newPatientEntry = { ...entry, id: id };

	patients.push(newPatientEntry);
	return newPatientEntry;
};

const findById = (id: string): NoSSNPatients | undefined => {
	const entry = patients.find((patient) => patient.id === id);
	if (entry !== undefined) {
		const withoutSSN = {
			id: entry.id,
			name: entry.name,
			dateOfBirth: entry.dateOfBirth,
			gender: entry.gender,
			occupation: entry.occupation
		};
		return withoutSSN;
	}
	return undefined;
};

const newEntry = (patientObject: unknown): NewPatients => {
	if (!patientObject || typeof patientObject !== 'object') {
		throw new Error('incorrect object');
	}
	if (
		'ssn' in patientObject &&
		'name' in patientObject &&
		'dateOfBirth' in patientObject &&
		'gender' in patientObject &&
		'occupation' in patientObject
	) {
		const newPatient: NewPatients = {
			ssn: parser.parseString(patientObject.ssn),
			name: parser.parseString(patientObject.name),
			dateOfBirth: parser.parseString(patientObject.dateOfBirth),
			gender: parser.parseGender(patientObject.gender),
			occupation: parser.parseString(patientObject.occupation)
		};
		return newPatient;
	}
	throw new Error('incorrect or missing data!');
};

export default {
	getDiagnostics,
	getPatients,
	addPatient,
	findById,
	newEntry
};
