import React from 'react';

const Header = ({ name }) => {
	return <h2>{name}</h2>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</div>
	);
};

const Total = ({ parts }) => {
	const sum = parts
		// .map((part) => part.exercises)
		// .reduce((accumulator, exercises) => accumulator + exercises);
		.reduce((accumulator, currVal) => accumulator + currVal.exercises, 0);
	return (
		<p>
			<strong>total of {sum} exercises</strong>
		</p>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};
export default Course;
