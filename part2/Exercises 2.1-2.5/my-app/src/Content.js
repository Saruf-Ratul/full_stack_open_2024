// Content.js
import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
      <p><strong>Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</strong></p>
    </div>
  );
};

export default Content;
