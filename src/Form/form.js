import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  fetchJson,
  betterType,
  isNumeric,
  parseObjectPath,
  getObjectValue
} from 'martingale-utils';
import Alert from '../Alerts/Alerts';
import {validate} from 'jsonschema';

import JsonSchemaForm from 'react-jsonschema-form';

const removeValue = (src, path)=>{
  if(!src){
    return undefined;
  }
  if(Array.isArray(src)){
    if(isNumeric(path[0])){
      const index = +path.shift();
      return [...src.slice(0, index), ...src.slice(index)];
    }
    return undefined;
  }
  if(betterType(src)==='object'){
    const key = path.shift();
    return Object.keys(src).reduce((obj, srcKey)=>{
      if(srcKey===key){
        if(path.length===0){
          return obj;
        }
        const retVal = removeValue(src[srcKey], path);
        if(retVal){
          return Object.assign(obj, {[srcKey]: retVal});
        }
        return obj;
      }
      return Object.assign(obj, {[srcKey]: src[srcKey]});
    }, {});
  }
  if(path.length){
    return removeValue(src[path.shift()], path);
  }
  return undefined;
};

class BaseForm extends Component{
  constructor(){
    super();
    this.state = {};
  }

  getErrorPanel(err){
    const message = typeof(err)==='string'?err:err.message||err.toString();
    const path = Array.isArray(err.path)?err.path.join('/'):err.key||message;
    return <Alert type="danger" key={path}>{message}</Alert>;
  }

  getErrorsPanel(errors){
    if(!errors){
      return '';
    }
    if(Array.isArray(errors)){
      if(errors.length === 0){
        return '';
      }
      return (
        <div className="validation-errors">
          {errors.map(this.getErrorPanel.bind(this))}
        </div>
      );
    }
    if(typeof(errors)==='object'){
      if(errors.errors){
        return this.getErrorsPanel(errors.errors);
      }
      if(errors.error){
        return this.getErrorsPanel(errors.error);
      }
      return (
        <div className="validation-errors">
          {Object.keys(errors).map((key)=>{
            const err = errors[key];
            return this.getErrorPanel(err);
          })}
        </div>
      );
    }
    if(typeof(errors)==='string'){
      if(errors.toLowerCase().match('<body')){
        const html = document.createElement('html');
        html.innerHTML = errors;
        const body = html.getElementsByTagName('body');
        const content = body&&body[0]&&body[0].innerHTML;
        return (
          <div className="validation-errors">
            <Alert type="danger"><div dangerouslySetInnerHTML={{__html: errors}} /></Alert>
          </div>
        );
      }
    }
    return (
      <div className="validation-errors">
        <Alert type="danger">{errors}</Alert>
      </div>
    );
  }

  navigateToSuccess(data){
    const {
      successUrl,
      history
    } = this.props;
    if(typeof(successUrl)==='function'){
      return history.push(successUrl(data));
    }
    history.push(successUrl||'/');
  }

  onSubmit({formData}){
    const {
      submitTo,
      mapper,
      onSubmit,
      dataRoot
    } = this.props;
    const rawOrgData = this.getPropData();
    const mappedData = mapper?mapper(formData):formData;
    const data = Object.assign({}, this.getPropData(true), mappedData);
    if(onSubmit){
      return onSubmit(data);
    }
    if(submitTo){
      const {
        method = 'POST',
        url,
        mapper
      } = typeof(submitTo)==='string'?{url: submitTo}:submitTo;
      return fetchJson({
        url,
        method,
        payload: mapper?mapper(data):data,
        callback: (err, payload, res, contentType)=>{
          if(err){
            return console.error(err);
          }
          if(!res.ok){
            return this.setState({errors: payload});
          }
          this.navigateToSuccess(data);
        }
      });
    }
    this.navigateToSuccess(data);
  }

  stripInvalid(data, schema){
    const valid = validate(data, schema);
    if(valid.errors){
      const res = valid.errors.reduce((res, err)=>{
        const {
          property
        } = err;
        if(property){
          const path = parseObjectPath(property);
          if(path[0] === 'instance'){
            path.shift();
          }
          const val = removeValue(res, path);
          return val;
        }
        return res;
      }, data);
      return res;
    }
    return data;
  }

  getPropData(raw){
    const {
      formData,
      data,
      dataRoot
    } = this.props;
    const theData = formData || data;
    if(raw){
      return theData;
    }
    if(theData && dataRoot){
      return getObjectValue(dataRoot, theData);
      //return theData[dataRoot];
    }
    return theData;
  }

  render(){
    const {
      children,
      schemaEncoder,
      uiSchemaEncoder,
      schema: formSchema,
      stripInvalid=true,
      ...props
    } = this.props;
    const data = this.getPropData();
    const schema = formSchema?(schemaEncoder?schemaEncoder(formSchema):formSchema):{};
    const uiSchema = formSchema?(uiSchemaEncoder?uiSchemaEncoder(formSchema):{}):{};
    const {
      value,
      errors: validationErrors
    } = this.state;
    const errors = this.getErrorsPanel(validationErrors);
    const jsFormData = (stripInvalid && data)?
        this.stripInvalid(data, schema):
        data;
    return (
      <div>
        {errors}
        <JsonSchemaForm
          uiSchema={uiSchema}
          schema={schema}
          formData={jsFormData}
          onSubmit={this.onSubmit.bind(this)}
          {...props}
          >
          {children}
        </JsonSchemaForm>
      </div>
    );
  }
};

const Form = withRouter(BaseForm);

Form.propTypes = Object.assign({}, JsonSchemaForm.propTypes, {
  schema: PropTypes.object,
  dataRoot: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  schemaEncoder: PropTypes.func,
  uiSchemaEncoder: PropTypes.func,
  successUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  submitTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  stripInvalid: PropTypes.bool,
  mapper: PropTypes.func,
  onSubmit: PropTypes.func
});

export default Form;
