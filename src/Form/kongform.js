import React from 'react';

import {
  betterType
} from 'martingale-utils';

/*
{
  fields: {
    host: { type: "string", default: 'http://localhost:8001', required: true },
    username: { type: "string" },
    password: { type: "string" },
  }
}
*/

import {
  Form,
  TForm
} from './tform';

const fetchData=(from, as, self)=>{
  fetch(from, {credentials: 'same-origin'})
    .then((response)=>{
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((json)=>{
      self.setState({[as]: json})
    })
    .catch((err)=>{
      console.error(err);
      throw err;
    });
};

const kongSchemaToTSchema = (schema)=>{
  if(typeof(schema.fields)==='object'){
    const s = Object.keys(schema.fields).reduce((s, fieldName)=>{
      const fieldSchema = kongSchemaToTSchema(schema.fields[fieldName]);
      s[fieldName] = fieldSchema;
      return s;
    }, {});
    return TForm.struct(s);
  }
  if(typeof(schema.type)==='string'){
    switch(schema.type){
//      case('hidden'):
//        return schema.required?TForm.String:TForm.maybe(TForm.String);
      case('string'):
        return schema.required?TForm.String:TForm.maybe(TForm.String);
      case('number'):
        return schema.required?TForm.Number:TForm.maybe(TForm.Number);
      case('boolean'):
        return schema.required?TForm.Boolean:TForm.maybe(TForm.Boolean);
      case('array'):
        const childSchema = schema.schema?kongSchemaToTSchema(schema.schema):TForm.String;
        return schema.required?TForm.list(childSchema):TForm.maybe(TForm.list(childSchema));
      case('table'):
        const tableSchema = schema.schema || {};
        if(tableSchema.flexible){
          const listSchema = kongSchemaToTSchema(tableSchema);
          return TForm.list(listSchema);
        }
        return kongSchemaToTSchema(tableSchema);
      default:
        const e = new Error(`Schema type ${schema.type} is not yet supported.`);
        console.error(e);
        throw e;
    }
  }
};

const stringListTransformer={
  format(value){
    return Array.isArray(value) ? value.join(',') : (
        (betterType(value)==='object') && (Object.keys(value).length === 0)?'':value
      );
  },
  parse(str){
    return str ? str.split(',') : [];
  }
};

const kongSchemaToFieldOptions = (schema, options = {})=>{
  if(typeof(schema.type)==='string'){
    if(schema.hidden){
      return {type: 'hidden'};
    }
    switch(schema.type){
      case('hidden'):
        return {type: 'hidden'};
      case('string'):
        return schema.multiline?{type: 'textarea'}:{};
      case('array'):
        if(!schema.schema){
          return {
            factory: TForm.form.Textbox,
            transformer: stringListTransformer,
            help: 'Values are separated by commas (,)'
          };
        }
        break;
      case('table'):
        const tableSchema = schema.schema.fields || {};
        const s = Object.keys(tableSchema).reduce((s, fieldName)=>{
          const fieldSchema = kongSchemaToFieldOptions(tableSchema[fieldName]);
          s[fieldName] = fieldSchema;
          return s;
        }, {});
        if(schema.schema.flexible){
          return {item: {fields: s}};
        }
        return {fields: s};
      default:
    }
    return options;
  }
  if(typeof(schema.fields)==='object'){
    const s = Object.keys(schema.fields).reduce((s, fieldName)=>{
      const fieldSchema = kongSchemaToFieldOptions(schema.fields[fieldName]);
      s[fieldName] = fieldSchema;
      return s;
    }, {});
    return s;
  }
};

const applySchemaDefaults = function(value, schema){
  if(schema.default){
    if(typeof(value)==='undefined'){
      return schema.default;
    }
    return value;
  }

  if(typeof(schema.fields)==='object'){
    const s = Object.keys(schema.fields).reduce((s, fieldName)=>{
      const defaultedValue = applySchemaDefaults((value||{})[fieldName], schema.fields[fieldName]);
      s[fieldName] = defaultedValue;
      return s;
    }, {});
    return s;
  }

  return value;
};

class KongForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {schema:props.schema};
  }

  componentDidMount(){
    if(this.props.schemaUrl){
      fetchData(this.props.schemaUrl, 'schema', this);
    }
  }

  getForm(schema, rawProps){
    const {
      options = {},
      value,
      ...props
    } = rawProps;
    if(schema){
      const opts = Object.assign(options, {fields: kongSchemaToFieldOptions(schema)});
      const tSchema = kongSchemaToTSchema(schema);
      return <Form {...props} options={opts} schema={tSchema} value={applySchemaDefaults(value, schema)} />
    }
    return <div />;
  }

  render(){
    const {schema: propSchema, schemaUrl, ...props} = this.props;
    const {schema} = this.state;
    return this.getForm(schema, props);
  }
};

KongForm.propTypes = Form.propTypes;

export {
  KongForm
};
