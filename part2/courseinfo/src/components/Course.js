import React from 'react';

const Header = props => {
  return <h2>{props.name}</h2>;
};

const Content = props => {
  return props.parts.map(part => {
    return <Part key={part.id} name={part.name} exercises={part.exercises} />;
  });
};

const Total = props => {
  const total = props.parts
    .map(part => part.exercises)
    .reduce((accumulator, exercises) => accumulator + exercises);
  return <h3>total of {total} exercises</h3>;
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Course = props => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};
export default Course;
