import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
	NonSensitiveDiaryEntry,
	NewDiaryEntry,
	Visibility,
	Weather
} from './types';

const InputForm = () => {
	const [formData, setFormData] = useState<NewDiaryEntry | undefined>();
	const [errorMsg, setErrorMsg] = useState<string>('');

	const initialState: NewDiaryEntry = {
		date: '',
		visibility: Visibility.Great,
		weather: Weather.Sunny,
		comment: ''
	};
	const [values, setValues] = useState(initialState);

	const handleInput = (event: React.ChangeEvent<HTMLElement>) => {
		const { name, value } = event.target as HTMLInputElement;

		setValues({ ...values, [name]: value });
		console.log(values);
	};

	const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
		setErrorMsg('');
		event.preventDefault();
		setFormData(values);
	};

	useEffect(() => {
		console.log('i am form data', formData);
		if (formData !== undefined) {
			axios
				.post('http://localhost:3001/api/diaries/', formData)
				.then((response) => console.log(response.data))
				.catch((err) => {
					const errorAxios = err as AxiosError;
					setErrorMsg(errorAxios.response?.data as string);
					console.log(errorMsg);
				});
		}
	}, [formData]);

	return (
		<>
			<div style={{ color: 'red' }}>{errorMsg}</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="date">date </label>
				<input
					type="date"
					name="date"
					value={values.date}
					onChange={handleInput}
				></input>
				<br></br>
				<label htmlFor="visibility">visibility </label>
				<select name="visibility" onChange={handleInput}>
					<option value="great">great</option>
					<option value="good">good</option>
					<option value="ok">ok</option>
					<option value="poor">poor</option>
				</select>{' '}
				<br></br>
				<label htmlFor="weather">weather </label>
				<select name="weather" onChange={handleInput}>
					<option value="sunny">sunny</option>
					<option value="rainy">rainy</option>
					<option value="cloudy">cloudy</option>
					<option value="stormy">stormy</option>
					<option value="windy">windy</option>
				</select>{' '}
				<br></br>
				<label htmlFor="comment">comment </label>
				<input type="text" name="comment" onChange={handleInput}></input>
				<br></br>
				<button type="submit" value="submit">
					submit
				</button>
			</form>
		</>
	);
};

const App = () => {
	const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

	useEffect(() => {
		axios
			.get<NonSensitiveDiaryEntry[]>('http://localhost:3001/api/diaries')
			.then((response) => setDiaries(response.data as NonSensitiveDiaryEntry[]));
	});

	return (
		<div>
			<h1>Add new entry</h1>
			<InputForm />
			<h1>Diary Entries</h1>
			{diaries.map((entry) => (
				<li key={entry.id}>
					<b>{entry.date}</b> {entry.weather} weather, {entry.visibility} visibility.
				</li>
			))}
		</div>
	);
};

export default App;
