import React from 'react';
import PropTypes from 'prop-types';

import {
  Row
} from 'react-bootstrap';

const GridRow = (someProps)=>{
  const {
    children,
    ...props
  } = someProps;
  return (
    <Row {...props}>
      {children}
    </Row>
  );
};

GridRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default GridRow;
