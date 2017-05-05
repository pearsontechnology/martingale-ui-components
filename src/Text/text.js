import React from 'react';
import PropTypes from 'prop-types';

const Text = ({Component='span', value, children, ...props})=>{
  const displayValue = value || children;
  return <Component {...props}>{displayValue}</Component>;
};

Text.propTypes={
  value: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  Component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
};

export default Text;
