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
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const notifyWith = (message, type = 'success') => {
		setNotification({ message, type });
		setTimeout(() => {
			setNotification(null);
		}, 5000);
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

	const addPerson = (event) => {
		event.preventDefault();

		const existing = persons.find((p) => p.name === newName);
		if (existing) {
			const ok = window.confirm(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			if (ok) {
				const toUpdate = { ...existing, number: newNumber };
				personService
					.update(existing.id, toUpdate)
					.then((returnedPerson) => {
						setPersons(
							persons.map((p) => (p.id !== existing.id ? p : returnedPerson))
						);
						notifyWith(`Changed number of  ${existing.name}`);
						setNewName('');
						setNewNumber('');
					})
					.catch((error) => {
						console.log(error);
						setPersons(persons.filter((p) => p.id !== existing.id));
						notifyWith(
							`Information of ${existing.name} has already been removed from server`,
							'error'
						);
					});
			}
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};
			personService
				.create(personObject)
				.then((addedPerson) => {
					setPersons(persons.concat(addedPerson));
					notifyWith(`Added ${newName}`);
					setNewName('');
					setNewNumber('');
				})
				.catch((error) => {
					console.log(error.response.data.error);
					notifyWith(`${error.response.data.error}`, 'error');
				});
		}
	};

	const deletePerson = (id) => {
		const toDelete = persons.find((p) => p.id === id);
		const ok = window.confirm(`Delete ${toDelete.name} ?`);
		if (ok) {
			personService
				.remove(id)
				.then((response) => {
					setPersons(persons.filter((p) => p.id !== id));
					notifyWith(`Deleted ${toDelete.name}`);
				})
				.catch(() => {
					setPersons(persons.filter((p) => p.id !== id));
					notifyWith(`${toDelete.name} had already been removed`, 'error');
				});
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
			<Notification notification={notification} />
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
			<Persons persons={personToShow} handleDelete={deletePerson} />
		</>
	);
};

export default App;
