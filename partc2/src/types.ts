import patientService from "./services/patientService";

export interface Diagnostics {
	code: string;
	name: string;
	latin?: string;
}

export interface Patients {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NoSSNPatients = Omit<Patients, 'ssn'>