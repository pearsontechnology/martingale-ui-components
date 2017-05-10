import React, {Component} from 'react';
import PropTypes from 'prop-types';

import JsonSchemaForm from 'react-jsonschema-form';

class Form extends Component{
  render(){
    const {
      children,
      schemaEncoder,
      schema: formSchema,
      formData,
      data,
      ...props
    } = this.props;
    const schema = schemaEncoder?schemaEncoder(formSchema):formSchema;
    return (
      <JsonSchemaForm
        schema={schema}
        formData={formData||data}
        {...props}
        >
        {children}
      </JsonSchemaForm>
    );
  }
};

Form.propTypes = Object.assign({}, JsonSchemaForm.propTypes, {
  data: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
  schemaEncoder: PropTypes.func
});

export default Form;
