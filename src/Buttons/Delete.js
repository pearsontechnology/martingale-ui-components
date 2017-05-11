import React, {Component} from 'react';
import {
  fetchJson
} from 'martingale-utils';
import Button from './Confirm';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class DButton extends Component{
  performDelete(){
    const {
      target: url,
      successUrl = window.location.pathname || '/',
      history
    } = this.props;
    if(!url){
      return false;
    }
    fetchJson({
      url,
      method: 'DELETE',
      callback: (err, payload, res, contentType)=>{
        if(err){
          return console.error(err);
        }
        history.push(successUrl);
      }
    });
  }

  render(){
    const {
      caption = 'Delete',
      title = 'Are you sure?',
      message = 'Are you sure you want to delete?',
      target,
      successUrl,
      history,
      match,
      location,
      staticContext,
      ...props
    } = this.props;
    return (
      <Button
        btnStyle="danger"
        caption={caption}
        title={title}
        message={message}
        onYes={this.performDelete.bind(this)}
        {...props}
        />
    );
  }
};

const DeleteButton = withRouter(DButton);

DeleteButton.propTypes = Object.assign({}, Button.propTypes, {
  caption: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  target: PropTypes.string,
  successUrl: PropTypes.string
});

export default DeleteButton;