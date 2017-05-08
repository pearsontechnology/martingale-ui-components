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
      return this.props.onOk(dialog);
    }
    this.close();
  }

  handleCancel(dialog){
    if(this.props.onCancel){
      return this.props.onCancel(dialog);
    }
    if(this.props.onOk){
      return this.props.onOk(dialog);
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
      onOk, // to remove it from props
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
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)} />
        <Button onClick={this.showDialog.bind(this)} {...props}>{caption}</Button>
      </span>
    );
  }
};

InfoButton.propTypes = Object.assign({}, Button.propTypes, {
  onOk: PropTypes.func,
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

export default InfoButton;
