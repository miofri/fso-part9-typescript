import { Gender } from './types';

const isString = (data: unknown): data is string => {
	return typeof data === 'string' || data instanceof String;
};

const parseString = (data: unknown): string => {
	if (!data || !isString(data)) {
		throw new Error('Incorrect or missing data');
	}
	return data;
};

const isGender = (data: unknown): data is Gender => {
	if (!isString(data)) throw new Error('incorrect input for Gender field');

	return Object.values(Gender)
		.map((value) => value.toString())
		.includes(data);
};

const parseGender = (data: unknown): Gender => {
	if (!data || !isGender(data)) {
		throw new Error('incorrect gender parameter');
	}
	return data;
};

export default { parseString, parseGender };
