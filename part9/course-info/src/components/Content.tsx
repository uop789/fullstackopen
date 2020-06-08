import React from 'react';
import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part) => (
        <>
          <Part key={part.name} part={part} />
          <br />
        </>
      ))}
    </>
  );
};

export default Content;
