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
