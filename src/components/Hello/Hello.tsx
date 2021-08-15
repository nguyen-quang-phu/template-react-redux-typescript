import React from 'react';

import classes from './Hello.module.scss';

interface HelloProps {
  template?: string;
}

const Hello: React.FC<HelloProps> = ({ template }) => {
  const temp = 0;
  return <div>Hello</div>;
};

Hello.defaultProps = {};
export default Hello;
