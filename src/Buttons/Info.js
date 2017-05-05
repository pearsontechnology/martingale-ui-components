import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import {InfoDialog} from '../Dialogs';

class InfoButton extends React.Component{
  constructor({dialogOpen=false}){
    super();
    this.state={isDialogOpen: dialogOpen};
  }

  handleOk(dialog){
    if(this.props.onOk){
      return this.props.onOk(this);
    }
    this.setState({isDialogOpen: false});
  }

  handleCancel(dialog){
    if(this.props.onCancel){
      return this.props.onCancel(this);
    }
    if(this.props.onOk){
      return this.props.onOk(this);
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
      onOk,
      ...props
    } = this.props;
    const contents = caption || children;
    const {isDialogOpen} = this.state;
    return (
      <span>
        <InfoDialog
          visible={isDialogOpen}
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
