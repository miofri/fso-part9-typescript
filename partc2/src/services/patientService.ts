import diagnoses from "../../data/diagnoses.json";
import { Diagnostics } from "../types";
import patients from "../../data/patients.json";
import { NoSSNPatients } from "../types";
const getDiagnostics = (): Diagnostics[] => {
	return diagnoses;
}

const getPatients = (): NoSSNPatients[] => {
	const nonSensitivePatients = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id, name, dateOfBirth, gender, occupation
	}));

	return nonSensitivePatients as NoSSNPatients[];
}
export default { getDiagnostics, getPatients };
