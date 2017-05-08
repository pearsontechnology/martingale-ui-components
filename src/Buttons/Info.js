import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Dialog from '../Dialogs/Dialog';

const DEFAULT_ACTIONS={
  'Ok'(dialog){
    if(dialog.props.onOk){
      return dialog.props.onOk(dialog);
    }
    dialog.close && dialog.close();
  }
};

class InfoButton extends React.Component{
  handleOk(dialog){
    if(this.props.onOk){
      return this.props.onOk(this);
    }
    this.dialog.close();
  }

  handleCancel(dialog){
    if(this.props.onCancel){
      return this.props.onCancel(this);
    }
    if(this.props.onOk){
      return this.props.onOk(this);
    }
    this.dialog.close();
  }

  open(){
    this.dialog.open();
  }

  close(){
    this.dialog.close();
  }

  showDialog(e){
    e.preventDefault();
    this.open();
  }

  render(){
    const {
      children,
      caption,
      dialogTitle,
      dialogMessage,
      onOk,
      dialogOpen,
      actions,
      ...props
    } = this.props;
    const contents = caption || children;
    return (
      <span>
        <Dialog
          ref={(dialog)=>this.dialog=dialog}
          actions={DEFAULT_ACTIONS}
          visible={dialogOpen}
          title={dialogTitle}
          message={dialogMessage}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)} />
        <Button onClick={this.showDialog.bind(this)} {...props}>{contents}</Button>
      </span>
    );
  }
};

InfoButton.propTypes = Object.assign({}, Button.propTypes, {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  dialogOpen: PropTypes.bool,
  dialogTitle: PropTypes.string,
  dialogMessage: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
});

export default InfoButton;
