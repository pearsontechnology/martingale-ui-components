import React, {Component} from 'react';
import BaseDialog from './Dialog';
import PropTypes from 'prop-types';

const DEFAULT_ACTIONS={
  'Ok'(dialog){
    if(dialog.props.onOk){
      return dialog.props.onOk(dialog);
    }
    dialog.close && dialog.close();
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
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
});

export default Dialog;
