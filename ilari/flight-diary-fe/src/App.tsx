import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { text } from 'stream/consumers';
import { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';

const InputForm = () => {
	const [formData, setFormData] = useState<NewDiaryEntry[]>([]);
	const [errorMsg, setErrorMsg] = useState<string>('');
	let newFormObject: any;

	const creatingFormObject = (event: any) => {
		let newForm: any = {};
		for (let index = 0; index < 4; index++) {
			const entryName = event?.target[index].name;
			const entryValue = event?.target[index].value;
			const newObject = [
				{
					[entryName]: entryValue
				}
			];
			newForm = Object.assign(newForm, ...newObject);
		}
		return newForm;
	};

	const handleSubmit = async (event: any) => {
		setErrorMsg('');
		event.preventDefault();
		newFormObject = await creatingFormObject(event);
		setFormData(newFormObject);
	};

	useEffect(() => {
		console.log('i am form data', formData);
		if (formData.length !== 0) {
			axios
				.post('http://localhost:3001/api/diaries/', formData)
				.then((response) => response.data)
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
				<input type="date" name="date"></input>
				<br></br>
				<label htmlFor="visibility">visibility </label>
				<select name="visibility">
					<option value="great">great</option>
					<option value="good">good</option>
					<option value="ok">ok</option>
					<option value="poor">poor</option>
				</select>{' '}
				<br></br>
				<label htmlFor="weather">weather </label>
				<select name="weather">
					<option value="sunny">sunny</option>
					<option value="rainy">rainy</option>
					<option value="cloudy">cloudy</option>
					<option value="stormy">stormy</option>
					<option value="windy">windy</option>
				</select>{' '}
				<br></br>
				<label htmlFor="comment">comment </label>
				<input type="text" name="comment"></input>
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
