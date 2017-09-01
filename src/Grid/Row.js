import React from 'react';
import PropTypes from 'prop-types';

import {
  Row
} from 'react-bootstrap';


/**
 * A Grid row, typically contains Col's
 */
const GridRow = (props)=>{
  const {
    children,
    ...compProps
  } = props;
  return (
    <Row {...compProps}>
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
