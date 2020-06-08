import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          Name: {part.name} <br />
          Exercises: {part.exerciseCount} <br />
          Desc: {part.description} <br />
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          Name: {part.name} <br />
          Exercises: {part.exerciseCount} <br />
          Group Project: {part.groupProjectCount} <br />
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          Name: {part.name} <br />
          Exercises: {part.exerciseCount} <br />
          Desc: {part.description} <br />
          Submission link: {part.exerciseSubmissionLink} <br />
        </div>
      );
    case 'Learn GraphQl and TypeScript':
      return (
        <div>
          Name: {part.name} <br />
          Exercises: {part.exerciseCount} <br />
          Desc: {part.description} <br />
          Minimum Reading Hours: {part.minimumReadingTimeInHours} <br />
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
