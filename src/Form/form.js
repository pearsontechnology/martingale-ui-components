import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JsonSchemaForm from 'react-jsonschema-form';

class Form extends Component{
  render(){
    const {
      children,
      schemaEncoder,
      schema: formSchema,
      ...props
    } = this.props;
    const schema = schemaEncoder?schemaEncoder(formSchema):formSchema;
    console.log(schema);
    return (
      <JsonSchemaForm
        schema={schema}
        {...props}
        >
        {children}
      </JsonSchemaForm>
    );
  }
};

Form.propTypes = Object.assign({}, JsonSchemaForm.propTypes, {
  schemaEncoder: PropTypes.func
});

export default Form;
