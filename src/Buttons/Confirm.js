import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Dialog from '../Dialogs/Dialog';

const DEFAULT_ACTIONS={
  'Yes': {
    btnStyle: 'success',
    handler(dialog){
      if(dialog.props.onYes) {
        return dialog.props.onYes(dialog);
      }
      dialog.close();
    }
  },
  'No': {
    btnStyle: 'danger',
    handler(dialog){
      if(dialog.props.onNo) {
        return dialog.props.onNo(dialog);
      }
      dialog.close();
    }
  }
};

class ConfirmButton extends React.Component{
  handleYes(dialog){
    if(this.props.onYes){
      return this.props.onYes(this.dialog);
    }
    this.close();
  }

  handleNo(dialog){
    if(this.props.onNo){
      return this.props.onNo(this.dialog);
    }
    this.close();
  }

  handleCancel(dialog){
    if(this.props.onCancel){
      return this.props.onCancel(this.dialog);
    }
    if(this.props.onNo){
      return this.props.onNo(this.dialog);
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
      actions = DEFAULT_ACTIONS,
      onYes, // to remove it from props
      onNo, // to remove it from props
      ...props
    } = this.props;
    const contents = caption || children;
    return (
      <span>
        <Dialog
          ref={(dialog)=>this.dialog=dialog}
          actions={actions}
          visible={visible}
          title={title}
          message={message}
          onYes={this.handleYes.bind(this)}
          onNo={this.handleNo.bind(this)}
          onCancel={this.handleCancel.bind(this)} />
        <Button onClick={this.showDialog.bind(this)} {...props}>{contents}</Button>
      </span>
    );
  }
};

ConfirmButton.propTypes = Object.assign({}, Button.propTypes, {
  onYes: PropTypes.func,
  onNo: PropTypes.func,
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

export default ConfirmButton;
