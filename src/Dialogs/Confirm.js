import React from 'react';
import BaseDialog from './Dialog';
import PropTypes from 'prop-types';

const DEFAULT_ACTIONS={
  'Yes': {
    btnStyle: 'success',
    handler(dialog){
      if(dialog.props.onYes) {
        return dialog.props.onYes(dialog);
      }
      dialog.hide();
    }
  },
  'No': {
    btnStyle: 'danger',
    handler(dialog){
      if(dialog.props.onNo) {
        return dialog.props.onNo(dialog);
      }
      dialog.hide();
    }
  }
};

const Dialog = ({title, children, message, actions=DEFAULT_ACTIONS, ...props})=>(
  <BaseDialog title={title} actions={actions} message={message} {...props}>
    {children}
  </BaseDialog>
);

Dialog.propTypes = Object.assign({}, BaseDialog.propTypes, {
  title: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
});

export default Dialog;
