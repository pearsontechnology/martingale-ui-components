import React from 'react';
import PropTypes from 'prop-types';

import {
  Col
} from 'react-bootstrap';

const def=(val, def)=>typeof(val)!=='undefined'?val:def;

/**
 * A grid column
 * @name Col
 * @param {object} props
 * @param {number} props.size - Size of the column if you don't want to specify individual screen sizes
 * @param {number} props.lg - Size of the column when on a large screen
 * @param {number} props.md - Size of the column when on a medium screen
 * @param {number} props.sm - Size of the column when on a small screen
 * @param {number} props.xs - Size of the column when on a extra-small screen
 */

const GridCol = (props)=>{
  const {
    size: defSize,
    lg: defLgSize,
    md: defMdSize,
    sm: defSmSize,
    xs: defXsSize,
    children,
    ...compProps
  } = props;
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
    <Col {...sizes} {...compProps}>
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
