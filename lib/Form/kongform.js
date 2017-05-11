'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var camelToProperCase = function camelToProperCase(src) {
  return src.charAt(0).toUpperCase() + src.substr(1).replace(/([a-z0-9])([A-Z])/g, function (m, p, s) {
    return p + ' ' + s;
  });
};

var mkType = function mkType(key, type, schema) {
  return {
    type: type,
    title: camelToProperCase(key),
    description: schema.description,
    default: schema.default
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

var KongForm = function KongForm(_ref) {
  var _ref$schemaEncoder = _ref.schemaEncoder,
      schemaEncoder = _ref$schemaEncoder === undefined ? KongEncoder : _ref$schemaEncoder,
      props = _objectWithoutProperties(_ref, ['schemaEncoder']);

  return _react2.default.createElement(_form2.default, Object.assign({ schemaEncoder: schemaEncoder }, props));
};

KongForm.propTypes = _form2.default.propTypes;

exports.default = KongForm;