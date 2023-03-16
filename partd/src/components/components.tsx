import {
	coursePartsInterface,
	exerciseCount,
	HeaderProps
} from './component-types';

export const Header = (props: HeaderProps) => {
	return <h1>{props.courseName}</h1>;
};

export const Total = (props: exerciseCount) => {
	return <p> Number of exercises {props.count} </p>;
};

export const Content = ({ props }: coursePartsInterface) => {
	switch (props.kind) {
		case 'basic':
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>
					<br></br>
					<i>{props.description}</i>
				</div>
			);
		case 'group':
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>
					<br></br>
					<i>Number of group projects:{props.groupProjectCount}</i>
				</div>
			);
		case 'background':
			return (
				<div>
					<b>
						{props.name} {props.exerciseCount}
					</b>{' '}
					<br></br>
					<i>{props.backroundMaterial}</i>
				</div>
			);
		default:
			return <></>;
	}
};
