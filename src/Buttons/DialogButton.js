import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Dialog from '../Dialogs/Dialog';

import Button from './Button';

/**
 * Generates a button that when clicked prompts the user with a dialog.
 * @param {object} props
 * @param {function} props.onCancel - Callbacked when user cancels the dialog
 * @param {array} props.children - Array of children to be placed into the body of the dialog
 * @param {string} props.caption - Caption to put on the button
 * @param {string} props.title - Title of the dialog when it is displayed
 * @param {string} props.message - Message to be displayed (instead of using children) inside the dialog
 * @param {boolean} props.visible - Show the dialog
 * @param {array} props.actions - Array of actions to place in the dialog
*/
class DialogButton extends React.Component{
  handleCancel(dialog){
    if(this.props.onCancel){
      return this.props.onCancel(dialog);
    }
    this.close();
  }

  open(){
    this.dialog.open();
  }

  close(){
    this.dialog.close();
  }

  showDialog(e){
    e && e.preventDefault();
    this.open();
  }

  render(){
    const {
      children,
      caption,
      title,
      message,
      visible,
      actions,
      ...props
    } = this.props;
    const contents = message || children;
    return (
      <span>
        <Dialog
          ref={(dialog)=>this.dialog=dialog}
          actions={actions}
          visible={visible}
          title={title}
          message={contents}
          onCancel={this.handleCancel.bind(this)} />
        <Button onClick={this.showDialog.bind(this)} {...props}>{caption}</Button>
      </span>
    );
  }
};

DialogButton.propTypes = Object.assign({}, Button.propTypes, {
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
});

export default DialogButton;
