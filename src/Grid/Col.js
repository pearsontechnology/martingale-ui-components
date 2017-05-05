import React from 'react';
import PropTypes from 'prop-types';

import {
  Col
} from 'react-bootstrap';

const def=(val, def)=>typeof(val)!=='undefined'?val:def;

const GridCol = (compProps)=>{
  const {
    size: defSize,
    lg: defLgSize,
    md: defMdSize,
    sm: defSmSize,
    xs: defXsSize,
    children,
    ...props
  } = compProps;
  const size = def(defSize, 12);
  const xsSize = def(defXsSize, size);
  const smSize = def(defSmSize, xsSize);
  const mdSize = def(defMdSize, smSize);
  const lgSize = def(defLgSize, mdSize);
  const sizes= {
    lg: lgSize,
    md: mdSize,
    sm: smSize,
    xs: xsSize,
  };
  return (
    <Col {...sizes} {...props}>
      {children}
    </Col>
  );
};

GridCol.propTypes = {
  size: PropTypes.number,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  sx: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default GridCol;
