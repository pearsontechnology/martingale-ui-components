import React from 'react';
import PropTypes from 'prop-types';

import DialogButton from './DialogButton';

const defaultActions = ({onOk})=>{
  return {
    'Ok'(dialog){
      if(onOk){
        return onOk(dialog);
      }
      dialog.close && dialog.close();
    }
  };
};

const InfoButton = ({onOk, actions: passedActions, ...props})=>{
  const actions = passedActions || defaultActions({onOk});
  return (
    <DialogButton
      actions={actions}
      {...props}
      />
  );
};

InfoButton.propTypes = Object.assign({}, DialogButton.propTypes, {
  onOk: PropTypes.func
});

export default InfoButton;
