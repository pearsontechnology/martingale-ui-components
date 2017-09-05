import React from 'react';
import PropTypes from 'prop-types';

/**
 * A container to be placed within a panel that insets the contents
 * @param {object} props
 * @param {object} props.children - Children to be placed within the panel
 */

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
