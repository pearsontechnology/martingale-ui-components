import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import {ConfirmDialog} from '../Dialogs';

class ConfirmButton extends React.Component{
  constructor({dialogOpen=false}){
    super();
    this.state={isDialogOpen: dialogOpen};
  }

  handleYes(dialog){
    if(this.props.onYes){
      return this.props.onYes(this);
    }
    this.setState({isDialogOpen: false});
  }

  handleNo(dialog){
    if(this.props.onNo){
      return this.props.onNo(this);
    }
    this.setState({isDialogOpen: false});
  }

  handleCancel(dialog){
    if(this.props.onCancel){
      return this.props.onCancel(this);
    }
    if(this.props.onNo){
      return this.props.onNo(this);
    }
    this.setState({isDialogOpen: false});
  }

  show(){
    this.setState({isDialogOpen: true});
  }

  hide(){
    this.setState({isDialogOpen: false});
  }

  showDialog(e){
    e.preventDefault();
    this.setState({isDialogOpen: true});
  }

  render(){
    const {
      children,
      caption,
      dialogTitle,
      dialogMessage,
      onYes,
      onNo,
      ...props
    } = this.props;
    const contents = caption || children;
    const {isDialogOpen} = this.state;
    return (
      <span>
        <ConfirmDialog
          visible={isDialogOpen}
          title={dialogTitle}
          message={dialogMessage}
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

export default ConfirmButton;
