export interface HeaderProps {
	courseName: string;
}

export interface coursePartsInterface {
	props: {
		name: string;
		exerciseCount?: number;
		description?: string;
		groupProjectCount?: number;
		backroundMaterial?: string;
		kind?: string;
	};
}

export interface exerciseCount {
	count: number;
}

export interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

// 9.15
export interface CoursePartDescription extends CoursePartBase {
	description?: string;
}

export interface CoursePartBasic extends CoursePartDescription {
	kind: 'basic';
}

export interface CoursePartGroup extends CoursePartDescription {
	groupProjectCount: number;
	kind: 'group';
}

export interface CoursePartBackround extends CoursePartDescription {
	backroundMaterial: string;
	kind: 'background';
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackround;
