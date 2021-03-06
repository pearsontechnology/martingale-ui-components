import React from 'react';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/**
 * Generates an HTML Button
 * @name Button
 */
const _UiButton = (props)=>{
  const {
    children,
    btnStyle,
    match,
    location,
    history,
    staticContext,
    onClick,
    disabled: isDisabled = false,
    ...args
  } = props;
  const clickHandler = (e)=>{
    if(onClick){
      onClick.bind({
        props: {
          match,
          location,
          history
        }
      })(e);
    }
  };
  const disabled = typeof(isDisabled)==='function'?isDisabled(props):isDisabled;
  return (
    <Button bsStyle={btnStyle} onClick={clickHandler} {...args} disabled={disabled}>{children}</Button>
  );
};

const UiButton = withRouter(_UiButton);

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
