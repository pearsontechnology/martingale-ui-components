import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * Generates an HTML Button
 * @name Button
 */
const UiButton = (props)=>{
  const {
    children,
    btnStyle,
    ...args
  } = props;
  return (
    <Button bsStyle={btnStyle} {...args}>{children}</Button>
  );
};

UiButton.propTypes = {
  btnStyle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default UiButton;
