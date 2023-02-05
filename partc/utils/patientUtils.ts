import { gender } from "../types/patient";

const isString = (property: unknown): property is string => {
	return typeof property === 'string' || property instanceof String;
};

const parseString = (property: unknown): string => {
	if (!property || !isString(property)) {
		throw new Error("Incorrect or missing property");
	}
	return property;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEnumGender = (property: any): property is gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(gender).includes(property);

};

const parseGender = (property: unknown): gender => {
	if (!property || !isEnumGender(property)) {
		throw new Error("Incorrect or missing gender");
	}
	return property;
};

export default {
	parseGender,
	parseString
};
