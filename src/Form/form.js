import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  fetchJson
} from 'martingale-utils';

import JsonSchemaForm from 'react-jsonschema-form';

class BaseForm extends Component{
  onSubmit({formData}){
    const {
      successUrl,
      submitTo,
      history,
      mapper,
      onSubmit
    } = this.props;
    const data = mapper?mapper(formData):formData;
    if(onSubmit){
      return onSubmit(data);
    }
    if(submitTo){
      const {
        method = 'POST',
        url
      } = typeof(submitTo)==='string'?{url: submitTo}:submitTo;
      // do something with fetch here
    }
    if(typeof(successUrl)==='function'){
      return history.push(successUrl(data));
    }
    history.push(successUrl||'/');
  }

  render(){
    const {
      children,
      schemaEncoder,
      schema: formSchema,
      formData,
      data,
      ...props
    } = this.props;
    const schema = formSchema?(schemaEncoder?schemaEncoder(formSchema):formSchema):{};
    return (
      <JsonSchemaForm
        schema={schema}
        formData={formData||data}
        onSubmit={this.onSubmit.bind(this)}
        {...props}
        >
        {children}
      </JsonSchemaForm>
    );
  }
};

const Form = withRouter(BaseForm);

Form.propTypes = Object.assign({}, JsonSchemaForm.propTypes, {
  schema: PropTypes.object,
  data: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
  schemaEncoder: PropTypes.func,
  successUrl: PropTypes.oneOfType(PropTypes.string, PropTypes.func),
  submitTo: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  mapper: PropTypes.func,
  onSubmit: PropTypes.func
});

export default Form;
