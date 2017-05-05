import React from 'react';
import PropTypes from 'prop-types';

import {Modal} from 'react-bootstrap';

class Dialog extends React.Component{
  constructor({visible = true}){
    super();
    this.state={visible: visible};
  }

  show(){
    this.setState({visible: true});
  }

  hide(){
    this.setState({visible: false});
  }

  cancelClick(e){
    e && e.preventDefault();
    if(this.props.onCancel){
      return this.props.onCancel(this);
    }
    this.hide();
  }

  actionHandler(e, action){
    e.preventDefault();
    if(typeof(action)==='function'){
      return action(this);
    }
    if(action && action.handler){
      return action.handler(this);
    }
    return this.hide();
  }

  componentWillReceiveProps(newProps){
    const {
      visible
    } = newProps;
    if(typeof(visible)==='boolean'){
      this.setState({visible});
    }
  }

  render(){
    const {
      title = '',
      message,
      children,
      actions={}
    }=this.props;
    const {
      visible = true
    } = this.state;
    const content = message || children;

    const actionButtons = Object.keys(actions).map((actionName)=>{
      const action = actions[actionName];
      return (
        <button key={actionName} onClick={(e)=>this.actionHandler(e, action)} className={`btn btn-${action.btnStyle||'primary'}`}>{actionName}</button>
      );
    });

    return (
      <Modal show={visible} onHide={this.cancelClick.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content}
        </Modal.Body>
        <Modal.Footer>
          {actionButtons}
        </Modal.Footer>
      </Modal>
    );
  }
};

Dialog.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default Dialog;
