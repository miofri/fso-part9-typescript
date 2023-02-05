import diagnoseData from '../data/diagnoses.json';
import patientData from '../data/patients.json';
import { diagnose } from '../types/diagnose';
import { newPatient, patients } from '../types/patient';
import { v1 as uuid } from 'uuid';
import patientUtils from '../utils/patientUtils';

const diagnoseEntries: Array<diagnose> = diagnoseData;

const getDiagnosesEntries = (): Array<diagnose> => {
	console.log(diagnoseEntries);

	return diagnoseEntries;
};

const patientEntries: Array<patients> = patientData;

const getPatientEntries = (): Omit<patients, "ssn">[] => {
	return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) =>
	({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: newPatient): patients => {
	const id = uuid();

	const newPatientEntry = {
		id: id,
		...entry
	};

	console.log(newPatientEntry);

	patientData.push(newPatientEntry);
	return newPatientEntry;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const addPatientCheck = (object: any): newPatient => {
// 	const checkedEntry: newPatient = {
// 		name: patientUtils.parseString(object.name),
// 		dateOfBirth: patientUtils.parseString(object.dateOfBirth),
// 		ssn: patientUtils.parseString(object.ssn),
// 		gender: patientUtils.parseGender(object.gender),
// 		occupation: patientUtils.parseString(object.occupation)
// 	};

// 	return checkedEntry;
// };

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const addPatientCheck = (object: unknown): newPatient => {
	const newObject = object as Fields;
	const checkedEntry: newPatient = {
		name: patientUtils.parseString(newObject.name),
		dateOfBirth: patientUtils.parseString(newObject.dateOfBirth),
		ssn: patientUtils.parseString(newObject.ssn),
		gender: patientUtils.parseGender(newObject.gender),
		occupation: patientUtils.parseString(newObject.occupation)
	};

	return checkedEntry;
};

export default {
	getDiagnosesEntries,
	getPatientEntries,
	addPatient,
	addPatientCheck
};
