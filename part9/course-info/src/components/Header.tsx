import React from 'react';

// interface HeaderProps {
//   courseName: string;
// }

const Header: React.FC<{ courseName: string }> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

export default Header;
