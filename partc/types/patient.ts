export interface patients {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: string,
	occupation: string
}

export type newPatient = Omit<patients, 'id'>;

export enum gender {
	male = 'male',
	female = 'female',
	other = 'other'
}
