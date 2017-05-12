import React, {Component} from 'react';
import Form from './form';
import {
  betterType
} from 'martingale-utils';

const keyToTitle = (src)=>{
  return src.charAt(0).toUpperCase()+
      src.substr(1)
        .replace(/([a-z0-9])([A-Z])/g, (m, p, s)=>`${p} ${s}`)
        .replace(/([a-z0-9])_([A-Z0-9])/gi, (m, p, s)=>`${p} ${s.toUpperCase()}`);
};

const getDefaultValue = (type, value)=>{
  const defaultType = betterType(value);
  if(type === 'array' && defaultType !== 'array'){
    return [];
  }
  if(type === 'table' && defaultType !== 'object'){
    return {};
  }
  if(type === 'string' && defaultType !== 'string'){
    return '';
  }
  return value;
};

const mkType = (key, type, schema)=>{
  const defaultValue = getDefaultValue(type, schema.default);
  return {
    type,
    title: keyToTitle(key),
    description: schema.description,
    default: defaultValue
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
    if(schema.type==='array'){
      const arrSchema = mkType(key, 'array', schema);
      arrSchema.items = {
        type: 'object',
        required,
        properties
      };
      return arrSchema;
    }
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
      const stringDef = mkType(key, 'string', schema);
      if(schema.enum){
        stringDef.enum = schema.enum;
      }
      return stringDef;
    case('number'):
      return mkType(key, 'number', schema);
    case('boolean'):
      return mkType(key, 'boolean', schema);
    case('array'):
      const arrayChildSchema = schema.fields?KongEncoder(schema, key):mkType(key, 'string', schema);
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
