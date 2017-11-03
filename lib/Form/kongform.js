'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _martingaleUtils = require('martingale-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keyToTitle = function keyToTitle(src) {
  return src.charAt(0).toUpperCase() + src.substr(1).replace(/([a-z0-9])([A-Z])/g, function (m, p, s) {
    return p + ' ' + s;
  }).replace(/([a-z0-9])_([A-Z0-9])/gi, function (m, p, s) {
    return p + ' ' + s.toUpperCase();
  });
};

var getDefaultValue = function getDefaultValue(type, value) {
  var defaultType = (0, _martingaleUtils.betterType)(value);
  if (type === 'array' && defaultType !== 'array') {
    return [];
  }
  if (type === 'table' && defaultType !== 'object') {
    return {};
  }
  if (type === 'string' && defaultType !== 'string') {
    return '';
  }
  return value;
};

var mkType = function mkType(key, type, schema) {
  var defaultValue = getDefaultValue(type, schema.default);
  return {
    type: type,
    title: keyToTitle(key),
    description: schema.description,
    default: defaultValue
  };
};

var KongEncoder = function KongEncoder(schema, key) {
  if (_typeof(schema.fields) === 'object') {
    var required = [];
    var properties = Object.keys(schema.fields).reduce(function (def, fieldKey) {
      var fieldSchema = schema.fields[fieldKey];
      if (fieldSchema.required) {
        required.push(fieldKey);
      }
      var fieldDef = KongEncoder(fieldSchema, fieldKey);
      if (fieldDef) {
        return Object.assign({}, def, _defineProperty({}, fieldKey, fieldDef));
      }
      return def;
    }, {});
    if (schema.type === 'array') {
      var arrSchema = mkType(key, 'array', schema);
      arrSchema.items = {
        type: 'object',
        required: required,
        properties: properties
      };
      return arrSchema;
    }
    return {
      type: 'object',
      required: required,
      properties: properties
    };
  }
  switch (schema.type) {
    case 'table':
      var tableSchema = schema.schema || {};

      if (tableSchema.flexible) {
        var flexError = new Error('Support for table.flexible not yet implemented.');
        console.error(flexErrror);
        return;
      }

      var tableChildSchema = KongEncoder(tableSchema, key);
      return tableChildSchema;
    case 'id':
      return mkType(key, 'string', schema);
    case 'url':
      return mkType(key, 'string', schema);
    case 'timestamp':
      return mkType(key, 'date', schema);
    case 'string':
      var stringDef = mkType(key, 'string', schema);
      if (schema.enum) {
        stringDef.enum = schema.enum;
      }
      return stringDef;
    case 'number':
      return mkType(key, 'number', schema);
    case 'boolean':
      return mkType(key, 'boolean', schema);
    case 'array':
      var arrayChildSchema = schema.fields ? KongEncoder(schema, key) : mkType(key, 'string', schema);
      var _arrSchema = mkType(key, 'array', schema);
      _arrSchema.items = schema.enum ? { type: 'string', enum: schema.enum } : arrayChildSchema;
      if (schema.enum) {
        _arrSchema.uniqueItems = true;
      }
      return _arrSchema;
    default:
      var e = new Error('Schema type ' + schema.type + ' is not yet supported.');
      console.error(e);
      return;
  }
};

var KongUiEncoder = function KongUiEncoder(schema) {
  // TODO: Add in field ordering {"ui:order": ["bar", "foo"]}
  if (_typeof(schema.fields) === 'object' && schema.type !== 'array') {
    var propNames = Object.keys(schema.fields);
    var properties = propNames.reduce(function (def, fieldKey) {
      var fieldSchema = schema.fields[fieldKey];
      var fieldDef = KongUiEncoder(fieldSchema);
      if (fieldDef) {
        return Object.assign({}, def, _defineProperty({}, fieldKey, fieldDef));
      }
      return def;
    }, {});
    properties['ui:order'] = propNames.sort(function (propName1, propName2) {
      var propDef1 = schema.fields[propName1];
      var propDef2 = schema.fields[propName2];
      var type1 = propDef1.type || 'string';
      var type2 = propDef2.type || 'string';
      if (type1 !== type2) {
        if (type1 === 'object' || type1 === 'table' || type1 === 'array') {
          return 1;
        }
        if (type2 === 'object' || type2 === 'table' || type2 === 'array') {
          return -1;
        }
      }
      return propName1.localeCompare(propName2);
    });
    return properties;
  }
  switch (schema.type) {
    case 'table':
      return KongUiEncoder(schema.schema);
    case 'string':
      if (schema.hidden) {
        return {
          "ui:widget": "hidden"
        };
      }
    case 'string':
      if (schema.multiline) {
        return {
          "ui:widget": "textarea"
        };
      }
    case 'array':
      if (schema.fields) {
        return {
          items: KongUiEncoder({ fields: schema.fields })
        };
      }
      if (schema.multiline) {
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
var KongForm = function KongForm(_ref) {
  var _ref$schemaEncoder = _ref.schemaEncoder,
      schemaEncoder = _ref$schemaEncoder === undefined ? KongEncoder : _ref$schemaEncoder,
      _ref$uiSchemaEncoder = _ref.uiSchemaEncoder,
      uiSchemaEncoder = _ref$uiSchemaEncoder === undefined ? KongUiEncoder : _ref$uiSchemaEncoder,
      props = _objectWithoutProperties(_ref, ['schemaEncoder', 'uiSchemaEncoder']);

  return _react2.default.createElement(_form2.default, Object.assign({ schemaEncoder: schemaEncoder, uiSchemaEncoder: uiSchemaEncoder }, props));
};

KongForm.propTypes = _form2.default.propTypes;

exports.default = KongForm;