import React, {Component} from 'react';
import Form from './form';

/*
{
  type: 'object',
  required: [],
  properties: {
    name: {
      type: 'string',
      title: 'Title',
      description: 'Something goes here'
    }
  }
}
*/

const camelToProperCase = (src)=>{
  return src.charAt(0).toUpperCase()+src.substr(1).replace(/([a-z0-9])([A-Z])/g, (m, p, s)=>`${p} ${s}`);
};

const mkType = (key, type, schema)=>{
  return {
    type,
    title: camelToProperCase(key),
    description: schema.description,
    default: schema.default
  };
};

const KongEncoder = (schema, key)=>{
  if(typeof(schema.fields)==='object'){
    const required = [];
    const properties = Object.keys(schema.fields).reduce((def, fieldKey)=>{
        const fieldSchema = schema.fields[fieldKey];
        if(fieldSchema.required){
          required.push(fieldKey);
        }
        const fieldDef = KongEncoder(fieldSchema, fieldKey);
        if(fieldDef){
          return Object.assign({}, def, {[fieldKey]: fieldDef})
        }
        return def;
      }, {});
    return {
      type: 'object',
      required,
      properties
    }
  }
  switch(schema.type){
    case('table'):
      const tableSchema = schema.schema || {};

      if(tableSchema.flexible){
        const flexError = new Error(`Support for table.flexible not yet implemented.`);
        console.error(flexErrror);
        return;
      }

      const tableChildSchema = KongEncoder(tableSchema, key);
      return tableChildSchema;
    case('id'):
      return mkType(key, 'string', schema);
    case('url'):
      return mkType(key, 'string', schema);
    case('timestamp'):
      return mkType(key, 'date', schema);
    case('string'):
      return mkType(key, 'string', schema);
    case('number'):
      return mkType(key, 'number', schema);
    case('boolean'):
      return mkType(key, 'boolean', schema);
    case('array'):
      const arrayChildSchema = schema.schema?KongEncoder(schema.schema, key):mkType(key, 'string', schema);
      const arrSchema = mkType(key, 'array', schema);
      arrSchema.items = schema.enum?{type: 'string', enum: schema.enum}:arrayChildSchema;
      if(schema.enum){
        arrSchema.uniqueItems = true;
      }
      return arrSchema;
    default:
      const e = new Error(`Schema type ${schema.type} is not yet supported.`);
      console.error(e);
      return;
  }
};

const KongForm = ({schemaEncoder=KongEncoder, ...props})=>(
  <Form schemaEncoder={schemaEncoder} {...props} />
);

KongForm.propTypes = Form.propTypes;

export default KongForm;
