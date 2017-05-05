'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KongForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _martingaleUtils = require('martingale-utils');

var _tform = require('./tform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
{
  fields: {
    host: { type: "string", default: 'http://localhost:8001', required: true },
    username: { type: "string" },
    password: { type: "string" },
  }
}
*/

var fetchData = function fetchData(from, as, self) {
  fetch(from, { credentials: 'same-origin' }).then(function (response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  }).then(function (json) {
    self.setState(_defineProperty({}, as, json));
  }).catch(function (err) {
    console.error(err);
    throw err;
  });
};

var kongSchemaToTSchema = function kongSchemaToTSchema(schema) {
  if (_typeof(schema.fields) === 'object') {
    var s = Object.keys(schema.fields).reduce(function (s, fieldName) {
      var fieldSchema = kongSchemaToTSchema(schema.fields[fieldName]);
      s[fieldName] = fieldSchema;
      return s;
    }, {});
    return _tform.TForm.struct(s);
  }
  if (typeof schema.type === 'string') {
    switch (schema.type) {
      //      case('hidden'):
      //        return schema.required?TForm.String:TForm.maybe(TForm.String);
      case 'string':
        return schema.required ? _tform.TForm.String : _tform.TForm.maybe(_tform.TForm.String);
      case 'number':
        return schema.required ? _tform.TForm.Number : _tform.TForm.maybe(_tform.TForm.Number);
      case 'boolean':
        return schema.required ? _tform.TForm.Boolean : _tform.TForm.maybe(_tform.TForm.Boolean);
      case 'array':
        var childSchema = schema.schema ? kongSchemaToTSchema(schema.schema) : _tform.TForm.String;
        return schema.required ? _tform.TForm.list(childSchema) : _tform.TForm.maybe(_tform.TForm.list(childSchema));
      case 'table':
        var tableSchema = schema.schema || {};
        if (tableSchema.flexible) {
          var listSchema = kongSchemaToTSchema(tableSchema);
          return _tform.TForm.list(listSchema);
        }
        return kongSchemaToTSchema(tableSchema);
      default:
        var e = new Error('Schema type ' + schema.type + ' is not yet supported.');
        console.error(e);
        throw e;
    }
  }
};

var stringListTransformer = {
  format: function format(value) {
    return Array.isArray(value) ? value.join(',') : (0, _martingaleUtils.betterType)(value) === 'object' && Object.keys(value).length === 0 ? '' : value;
  },
  parse: function parse(str) {
    return str ? str.split(',') : [];
  }
};

var kongSchemaToFieldOptions = function kongSchemaToFieldOptions(schema) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof schema.type === 'string') {
    if (schema.hidden) {
      return { type: 'hidden' };
    }
    switch (schema.type) {
      case 'hidden':
        return { type: 'hidden' };
      case 'string':
        return schema.multiline ? { type: 'textarea' } : {};
      case 'array':
        if (!schema.schema) {
          return {
            factory: _tform.TForm.form.Textbox,
            transformer: stringListTransformer,
            help: 'Values are separated by commas (,)'
          };
        }
        break;
      case 'table':
        var tableSchema = schema.schema.fields || {};
        var s = Object.keys(tableSchema).reduce(function (s, fieldName) {
          var fieldSchema = kongSchemaToFieldOptions(tableSchema[fieldName]);
          s[fieldName] = fieldSchema;
          return s;
        }, {});
        if (schema.schema.flexible) {
          return { item: { fields: s } };
        }
        return { fields: s };
      default:
    }
    return options;
  }
  if (_typeof(schema.fields) === 'object') {
    var _s = Object.keys(schema.fields).reduce(function (s, fieldName) {
      var fieldSchema = kongSchemaToFieldOptions(schema.fields[fieldName]);
      s[fieldName] = fieldSchema;
      return s;
    }, {});
    return _s;
  }
};

var applySchemaDefaults = function applySchemaDefaults(value, schema) {
  if (schema.default) {
    if (typeof value === 'undefined') {
      return schema.default;
    }
    return value;
  }

  if (_typeof(schema.fields) === 'object') {
    var s = Object.keys(schema.fields).reduce(function (s, fieldName) {
      var defaultedValue = applySchemaDefaults((value || {})[fieldName], schema.fields[fieldName]);
      s[fieldName] = defaultedValue;
      return s;
    }, {});
    return s;
  }

  return value;
};

var KongForm = function (_React$Component) {
  _inherits(KongForm, _React$Component);

  function KongForm(props) {
    _classCallCheck(this, KongForm);

    var _this = _possibleConstructorReturn(this, (KongForm.__proto__ || Object.getPrototypeOf(KongForm)).call(this, props));

    _this.state = { schema: props.schema };
    return _this;
  }

  _createClass(KongForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.schemaUrl) {
        fetchData(this.props.schemaUrl, 'schema', this);
      }
    }
  }, {
    key: 'getForm',
    value: function getForm(schema, rawProps) {
      var _rawProps$options = rawProps.options,
          options = _rawProps$options === undefined ? {} : _rawProps$options,
          value = rawProps.value,
          props = _objectWithoutProperties(rawProps, ['options', 'value']);

      if (schema) {
        var opts = Object.assign(options, { fields: kongSchemaToFieldOptions(schema) });
        var tSchema = kongSchemaToTSchema(schema);
        return _react2.default.createElement(_tform.Form, Object.assign({}, props, { options: opts, schema: tSchema, value: applySchemaDefaults(value, schema) }));
      }
      return _react2.default.createElement('div', null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          propSchema = _props.schema,
          schemaUrl = _props.schemaUrl,
          props = _objectWithoutProperties(_props, ['schema', 'schemaUrl']);

      var schema = this.state.schema;

      return this.getForm(schema, props);
    }
  }]);

  return KongForm;
}(_react2.default.Component);

;

KongForm.propTypes = _tform.Form.propTypes;

exports.KongForm = KongForm;