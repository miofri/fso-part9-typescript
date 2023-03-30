import React, { useEffect } from 'react';
import { useState } from 'react';
import { Note } from './types';
import axios from 'axios';
import { createNote, getAllNotes } from './services/noteService';

const App = () => {
	const [newNote, setNewNote] = useState('');
	const [notes, setNotes] = useState<Note[]>([{ id: 1, content: 'testing' }]);

	const noteCreation = (event: React.SyntheticEvent) => {
		event.preventDefault();
		createNote({ content: newNote }).then((data) => {
			setNotes(notes.concat(data));
		});
		setNewNote('');
	};

	useEffect(() => {
		getAllNotes().then((data) => setNotes(data));
	}, []);

	return (
		<div>
			<form onSubmit={noteCreation}>
				<input
					value={newNote}
					onChange={(event) => {
						console.log(event.target.value);
						setNewNote(event.target.value);
					}}
				></input>
				<button type="submit">add</button>
			</form>
			<ul>
				{notes.map((note) => (
					<li key={note.id}> {note.content}</li>
				))}
			</ul>
		</div>
	);
};
export default App;
