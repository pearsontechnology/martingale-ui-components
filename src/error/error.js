import React from 'react';

import Alert from '../Alerts/Alerts';

/**
 * Creates an Alert containing details of the passed in error
 * @param {object} props
 * @param {object} props.error - Error to be displayed within the alert
 */

const Error = ({error})=>{
  if(typeof(error)==='string'){
    return <Alert type='danger'>{error}</Alert>;
  }
  if(error.error && error.statusCode && error.message){
    return <Alert type='danger'><strong>{error.error} ({error.statusCode}):</strong> {error.message}</Alert>;
  }
  if(error.error && error.message){
    return <Alert type='danger'><strong>{error.error}:</strong> {error.message}</Alert>;
  }
  if(error.message){
    return <Alert type='danger'>{error.message}</Alert>;
  }
  return <Alert type='danger'><pre>{JSON.stringify(error, null, 2)}</pre></Alert>;
};

export default Error;
