import React from 'react';
import PropTypes from 'prop-types';

const Inset = (props)=>{
  const {
    children,
  } = props;
  return (
    <div className="panel-body">
      {children}
    </div>
  );
};

Inset.propTypes={
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default Inset;
