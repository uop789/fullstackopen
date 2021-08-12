import React from 'react';

const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ course }) => {
	return (
		<>
			<Part part={course.parts[0]} />
			<Part part={course.parts[1]} />
			<Part part={course.parts[2]} />
		</>
	);
};

const Total = ({ course }) => {
	const sum =
		course.parts[0].exercises +
		course.parts[1].exercises +
		course.parts[2].exercises;
	return <p>Number of exercises {sum}</p>;
};

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
			},
			{
				name: 'State of a component',
				exercises: 14,
			},
		],
	};

	return (
		<>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</>
	);
};

export default App;
