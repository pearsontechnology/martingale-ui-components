import React from 'react';
import PropTypes from 'prop-types';

import {
  Alert
} from 'react-bootstrap';

class DismissableAlert extends React.Component{
  constructor(){
    super();
    this.state = {};
  }

  dismiss(e){
    e && e.preventDefault();
    return this.hide();
  }

  show(){
    return this.setState({dismissed: false});
  }

  hide(){
    return this.setState({dismissed: true});
  }

  renderAlert(options){
    const {
      type = 'info',
      children
    } = this.props;
    const {
      dismissed
    } = this.state;
    const showHideClass = dismissed?'hidden':'visible';
    return (
      <Alert className={showHideClass} bsStyle={type} onDismiss={this.dismiss.bind(this)}>
        {children}
      </Alert>
    );
  }

  render(){
    return this.renderAlert(this.props);
  }
};

const BasicAlert = ({type, children})=><Alert bsStyle={type}>{children}</Alert>;

const DismissAfter = (Wrap)=>{
  return class Dismissable extends React.Component{
    constructor(){
      super();
      this.state = {};
    }

    componentDidMount(){
      if(this.props.dismissAfter){
        this.setState({timer: setTimeout(()=>this.dismiss(), this.props.dismissAfter)});
      }
    }

    componentWillUnmount(){
      this._clearTimeout();
    }

    _clearTimeout(cb=()=>{}){
      if(this.state.timer){
        clearTimeout(this.state.timer);
        this.setState({timer: false});
      }
      return cb();
    }

    dismiss(){
      this._clearTimeout(()=>this.dismissable.dismiss());
    }

    render(){
      const props = this.props;
      return <Wrap ref={(dismissable)=>this.dismissable=dismissable} {...props} />
    }
  };
};

/**
 * Displays an alert box with optional dismiss button and/or self dismissing
 * @name Alert
 * @param {object} props
 * @param {string} props.bsClass - Bootstrap Classname
 * @param {array} props.children - Array of components to put inside the alert
 * @param {string} props.closeLabel - Text to place in the close button
 * @param {number} props.dismissAfter - Dismiss the alert after x milliseconds has elapsed
 * @param {boolean} props.dismissable - If true the place a close button on the alert and allow user to dismiss the alert
 * @param {function} props.onDismiss - Callback when the alert is dismissed
 * @param {('info'|'success'|'warning'|'danger')} props.type - Type of alert to be shown
 */

const AlertWrapper = (props)=>{
  const {
    dismissable = false,
    dismissAfter
  } = props;
  if(typeof(dismissAfter)!=='undefined'){
    return React.createElement(DismissAfter(DismissableAlert), props);
  }
  const AlertType = dismissable?DismissableAlert:BasicAlert;
  return React.createElement(AlertType, props);
};

AlertWrapper.propTypes = Object.assign({}, Alert.propTypes, {
  bsStyle: PropTypes.string,
  dismissable: PropTypes.bool,
  dismissAfter: PropTypes.number,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
});

export default AlertWrapper;
