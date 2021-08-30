import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterString, setStringFilter] = useState('');
	const [successfulMessgae, setSuccessfulMessgae] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		const exisiting = persons.find((p) => p.name === newName);
		if (!exisiting) {
			const personObject = {
				name: newName,
				number: newNumber,
			};
			personService.create(personObject).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				setNewName('');
				setNewNumber('');
				setSuccessfulMessgae(`Added ${returnedPerson.name}`);
				setTimeout(() => {
					setSuccessfulMessgae(null);
				}, 5000);
			});
		} else {
			const ok = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			if (ok) {
				const person = persons.find((person) => person.name === newName);
				const changedPerson = { ...person, number: newNumber };
				personService
					.update(person.id, changedPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) => (p.id !== person.id ? p : returnedPerson))
						);
						setSuccessfulMessgae(`Number of ${returnedPerson.name} changed`);
						setTimeout(() => {
							setSuccessfulMessgae(null);
						}, 5000);
					})
					.catch((error) => {
						setErrorMessage(
							`Information of ${newName} has already been removed from server`
						);
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					});
			} else {
				setNewName('');
				setNewNumber('');
			}
		}
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleFilterStringChange = (event) => {
		setStringFilter(event.target.value);
	};

	const handleDeleteOf = (id, name) => {
		if (window.confirm(`Delete ${name} ?`)) {
			personService
				.deleteRecord(id)
				.then(setPersons(persons.filter((person) => person.id !== id)));
		}
	};

	const personToShow =
		filterString.length === 0
			? persons
			: persons.filter((p) =>
					p.name.toLowerCase().includes(filterString.toLowerCase())
			  );

	return (
		<>
			<h2>Phonebook</h2>
			<Notification
				message={successfulMessgae || errorMessage}
				successfulMessgae={successfulMessgae}
				errorMessage={errorMessage}
			/>
			<Filter value={filterString} onChange={handleFilterStringChange} />
			<h3>Add a new</h3>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons personToShow={personToShow} handleDelete={handleDeleteOf} />
		</>
	);
};

export default App;
