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

const KongUiEncoder = (schema)=>{
  // TODO: Add in field ordering {"ui:order": ["bar", "foo"]}
  if(typeof(schema.fields)==='object' && (schema.type !== 'array')){
    const propNames = Object.keys(schema.fields);
    const properties = propNames.reduce((def, fieldKey)=>{
      const fieldSchema = schema.fields[fieldKey];
      const fieldDef = KongUiEncoder(fieldSchema);
      if(fieldDef){
        return Object.assign({}, def, {[fieldKey]: fieldDef});
      }
      return def;
    }, {});
    properties['ui:order'] = propNames.sort((propName1, propName2)=>{
      const propDef1 = schema.fields[propName1];
      const propDef2 = schema.fields[propName2];
      const type1 = propDef1.type || 'string';
      const type2 = propDef2.type || 'string';
      if(type1 !== type2){
        if(type1 === 'object' || type1 === 'table' || type1 === 'array'){
          return 1;
        }
        if(type2 === 'object' || type2 === 'table' || type2 === 'array'){
          return -1;
        }
      }
      return propName1.localeCompare(propName2);
    });
    return properties;
  }
  switch(schema.type){
    case('table'):
      return KongUiEncoder(schema.schema)
    case('string'):
      if(schema.multiline){
        return {
          "ui:widget": "textarea"
        };
      }
    case('array'):
      if(schema.fields){
        return {
          items: KongUiEncoder({fields: schema.fields})
        };
      }
      if(schema.multiline){
        return {
          items: {
            "ui:widget": "textarea"
          }
        };
      }
  }
  return {};
};

/**
 * JsonSchema-Form - more info at https://github.com/mozilla-services/react-jsonschema-form
 * @name Form
 * @param {object} props
 * @param {object} props.schema - Kong Schema for the data to be edited
 * @param {any} props.data - Default values to be displayed within the form
 * @param {any} props.dataRoot - Root key into data to use to source values for form
 * @param {string} props.successUrl - URL to navigate to upon a succesful submit of the form
 * @param {string|object} props.submitTo - URL or URL Options to submit the form to
 * @param {string} props.submitTo.url - URL to send to
 * @param {string} props.submitTo.method - HTTP Method to submit with (default POST)
 * @param {string} props.submitTo.headers - HTTP Headers to append to the request
 * @param {function} props.mapper - Used to mutate data returned from the form before sending it to the submitTo destination
 * @extends Form
 */
const KongForm = ({schemaEncoder=KongEncoder, uiSchemaEncoder=KongUiEncoder, ...props})=>(
  <Form schemaEncoder={schemaEncoder} uiSchemaEncoder={uiSchemaEncoder} {...props} />
);

KongForm.propTypes = Form.propTypes;

export default KongForm;
