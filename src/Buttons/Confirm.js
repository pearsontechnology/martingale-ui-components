import React from 'react';
import PropTypes from 'prop-types';

import DialogButton from './DialogButton';

const defaultActions=({onYes, onNo})=>{
  return {
    'Yes': {
      btnStyle: 'success',
      handler(dialog){
        if(onYes) {
          return onYes(dialog);
        }
        dialog.close();
      }
    },
    'No': {
      btnStyle: 'danger',
      handler(dialog){
        if(onNo) {
          return onNo(dialog);
        }
        dialog.close();
      }
    }
  };
};

/**
 * Generates a button that when clicked prompts the user with for a Yes/No answer.  Executs onYes/No when button is clicked.
 * @param {object} props
 * @param {function} props.onYes - Callbacked when Yes button is clicked
 * @param {function} props.onNo - Callbacked when No button is clicked
 * @extends DialogButton
 */
const ConfirmButton = ({onYes, onNo, actions: passedActions, ...props})=>{
  const actions = passedActions || defaultActions({onYes, onNo});
  return (
    <DialogButton
      actions={actions}
      {...props}
      />
  );
};

ConfirmButton.propTypes = Object.assign({}, DialogButton.propTypes, {
  onYes: PropTypes.func,
  onNo: PropTypes.func
});

export default ConfirmButton;
