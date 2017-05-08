import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

const creaetActionHandler = (actionName, action, dialog)=>{
  if(!action){
    throw new Error(`Malformed action ${actionName}`);
  }
  const handler = action.handler || action;
  if(typeof(handler)==='function'){
    return (e)=>{
      e&&e.preventDefault();
      handler(dialog);
    };
  }
  throw new Error(`No handler specified on action: ${actionName}`);
};

const getDialogFooter = (footer, actions, dialog)=>{
  if(footer){
    return (
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    );
  }
  if(actions){
    const actionButtons = Object.keys(actions).map((actionName)=>{
      const action = actions[actionName];
      return (
        <button key={actionName} onClick={creaetActionHandler(actionName, action, dialog)} className={`btn btn-${action.btnStyle||'primary'}`}>{actionName}</button>
      );
    });
    return (
      <Modal.Footer>
        {actionButtons}
      </Modal.Footer>
    );
  }
  return '';
};

class Dialog extends Component{
  constructor({
      visible = false,
      title,
      message,
      children,
      footer,
      actions,
      onHide
    }){
    super();
    this.contents = message || children;
    this.state = {visible};
    this.footer = getDialogFooter(footer, actions, this);
  }

  close(){
    return this.setState({visible: false});
  }

  open(){
    return this.setState({visible: true});
  }

  render(){
    const {
      title
    } = this.props;
    const {
      visible
    } = this.state;
    const {
      contents,
      footer
    } = this;
    return (
      <Modal show={visible} onHide={this.close.bind(this)}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contents}
        </Modal.Body>
        {footer}
      </Modal>
    );
  }
};

Dialog.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  actionsBoundTo: PropTypes.object,
  actions: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default Dialog;
