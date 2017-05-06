import React from 'react';
import TForm from 'tcomb-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  postJson
} from '../fetch';

const FormRender = TForm.form.Form;

const BareSchema = TForm.struct({});

class BaseForm extends React.Component{
  static propTypes = {
    schema: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    value: PropTypes.any,
    onSubmit: PropTypes.func,
    submitTo: PropTypes.shape({
      method: PropTypes.string,
      url: PropTypes.string,
      successUrl: PropTypes.string,
      mapper: PropTypes.func
    })
  }

  constructor(props){
    super();
    this.state = {value: props.value};
  }
  onSubmit(evt) {
    evt && evt.preventDefault();
    const valid = this.form.validate();
    //console.log('Valid?: ', JSON.stringify(valid, null, 2))
    if(valid && valid.errors && valid.errors.length){
      return this.setState(valid);
    }
    const value = valid.value;
    if (value) {
      if(this.props.onSubmit){
        this.props.onSubmit(evt, value);
      }

      if(this.props.submitTo){
        const history = this.props.history;
        const setState = this.setState.bind(this);
        const {
          method = 'post',
          url,
          successUrl,
          mapper
        } = this.props.submitTo;
        if(!url){
          throw new Error('No URL provided to submit to.');
        }
        postJson({
          url,
          method,
          payload: mapper?mapper(value):value,
          callback(err, payload, res){
            if(err){
              return console.error(err);
            }
            if(!res.ok){
              return setState({errors: payload});
            }
            if(successUrl){
              history.push(successUrl);
            }
          }
        });
      }
    }
    //console.log(valid);
    return this.setState(valid);
  }

  getErrorPanel(err){
    const message = typeof(err)==='string'?err:err.message||err.toString();
    const path = Array.isArray(err.path)?err.path.join('/'):err.key||message;
    return <div className="validation-error" key={path}>{message}</div>;
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
    return (
      <div className="validation-errors">
        <div className="validation-error">{errors}</div>;
      </div>
    );
  }

  render() {
    const {
      schema = BareSchema,
      ...props
    } = this.props;
    const {
      value,
      errors: validationErrors
    } = this.state;
    const errors = this.getErrorsPanel(validationErrors);

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        {errors}
        <FormRender ref={(form)=>this.form=form} type={schema} value={value} {...props} />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
};

const Form = withRouter(BaseForm);
Form.propTypes = BaseForm.propTypes;

export {
  Form,
  TForm
};
