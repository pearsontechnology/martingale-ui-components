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

/**
 * Generates a button that when clicked provides the user with a dialog of information.
 * @param {object} props
 * @param {string} props.caption - Text to display on the button
 * @param {string} props.title - Title to place in the dialog box
 * @param {string} props.message - Text to display within the dialog box
 * @extends DialogButton
 */
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
