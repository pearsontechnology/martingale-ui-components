import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = (props)=>{
  const {
    children
  } = props;
  return (
    <div className="list-group">
      {children}
    </div>
  );
};

ListGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default ListGroup;
