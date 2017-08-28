'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _martingaleUtils = require('martingale-utils');

var _Alerts = require('../Alerts/Alerts');

var _Alerts2 = _interopRequireDefault(_Alerts);

var _jsonschema = require('jsonschema');

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var removeValue = function removeValue(src, path) {
  if (!src) {
    return undefined;
  }
  if (Array.isArray(src)) {
    if ((0, _martingaleUtils.isNumeric)(path[0])) {
      var index = +path.shift();
      return [].concat(_toConsumableArray(src.slice(0, index)), _toConsumableArray(src.slice(index)));
    }
    return undefined;
  }
  if ((0, _martingaleUtils.betterType)(src) === 'object') {
    var key = path.shift();
    return Object.keys(src).reduce(function (obj, srcKey) {
      if (srcKey === key) {
        if (path.length === 0) {
          return obj;
        }
        var retVal = removeValue(src[srcKey], path);
        if (retVal) {
          return Object.assign(obj, _defineProperty({}, srcKey, retVal));
        }
        return obj;
      }
      return Object.assign(obj, _defineProperty({}, srcKey, src[srcKey]));
    }, {});
  }
  if (path.length) {
    return removeValue(src[path.shift()], path);
  }
  return undefined;
};

var BaseForm = function (_Component) {
  _inherits(BaseForm, _Component);

  function BaseForm() {
    _classCallCheck(this, BaseForm);

    var _this = _possibleConstructorReturn(this, (BaseForm.__proto__ || Object.getPrototypeOf(BaseForm)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(BaseForm, [{
    key: 'getErrorPanel',
    value: function getErrorPanel(err) {
      var message = typeof err === 'string' ? err : err.message || err.toString();
      var path = Array.isArray(err.path) ? err.path.join('/') : err.key || message;
      return _react2.default.createElement(
        _Alerts2.default,
        { type: 'danger', key: path },
        message
      );
    }
  }, {
    key: 'getErrorsPanel',
    value: function getErrorsPanel(errors) {
      var _this2 = this;

      if (!errors) {
        return '';
      }
      if (Array.isArray(errors)) {
        if (errors.length === 0) {
          return '';
        }
        return _react2.default.createElement(
          'div',
          { className: 'validation-errors' },
          errors.map(this.getErrorPanel.bind(this))
        );
      }
      if ((typeof errors === 'undefined' ? 'undefined' : _typeof(errors)) === 'object') {
        if (errors.errors) {
          return this.getErrorsPanel(errors.errors);
        }
        if (errors.error) {
          return this.getErrorsPanel(errors.error);
        }
        return _react2.default.createElement(
          'div',
          { className: 'validation-errors' },
          Object.keys(errors).map(function (key) {
            var err = errors[key];
            return _this2.getErrorPanel(err);
          })
        );
      }
      if (typeof errors === 'string') {
        if (errors.toLowerCase().match('<body')) {
          var html = document.createElement('html');
          html.innerHTML = errors;
          var body = html.getElementsByTagName('body');
          var content = body && body[0] && body[0].innerHTML;
          return _react2.default.createElement(
            'div',
            { className: 'validation-errors' },
            _react2.default.createElement(
              _Alerts2.default,
              { type: 'danger' },
              _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: errors } })
            )
          );
        }
      }
      return _react2.default.createElement(
        'div',
        { className: 'validation-errors' },
        _react2.default.createElement(
          _Alerts2.default,
          { type: 'danger' },
          errors
        )
      );
    }
  }, {
    key: 'navigateToSuccess',
    value: function navigateToSuccess(data) {
      var _props = this.props,
          successUrl = _props.successUrl,
          history = _props.history;

      if (typeof successUrl === 'function') {
        return history.push(successUrl(data));
      }
      history.push(successUrl || '/');
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(_ref) {
      var _this3 = this;

      var formData = _ref.formData;
      var _props2 = this.props,
          submitTo = _props2.submitTo,
          mapper = _props2.mapper,
          onSubmit = _props2.onSubmit,
          dataRoot = _props2.dataRoot;

      var rawOrgData = this.getPropData();
      var mappedData = mapper ? mapper(formData) : formData;
      var data = Object.assign({}, this.getPropData(true), mappedData);
      if (onSubmit) {
        return onSubmit(data);
      }
      if (submitTo) {
        var submitOptions = typeof submitTo === 'string' ? { url: submitTo } : submitTo;

        var _submitOptions$method = submitOptions.method,
            method = _submitOptions$method === undefined ? 'POST' : _submitOptions$method,
            url = submitOptions.url,
            _mapper = submitOptions.mapper,
            fetchOptions = _objectWithoutProperties(submitOptions, ['method', 'url', 'mapper']);

        return (0, _martingaleUtils.fetchJson)(Object.assign(fetchOptions, {
          url: url,
          method: method,
          payload: _mapper ? _mapper(data) : data,
          callback: function callback(err, payload, res, contentType) {
            if (err) {
              return console.error(err);
            }
            if (!res.ok) {
              return _this3.setState({ errors: payload });
            }
            _this3.navigateToSuccess(data);
          }
        }));
      }
      this.navigateToSuccess(data);
    }
  }, {
    key: 'stripInvalid',
    value: function stripInvalid(data, schema) {
      var valid = (0, _jsonschema.validate)(data, schema);
      if (valid.errors) {
        var res = valid.errors.reduce(function (res, err) {
          var property = err.property;

          if (property) {
            var path = (0, _martingaleUtils.parseObjectPath)(property);
            if (path[0] === 'instance') {
              path.shift();
            }
            var val = removeValue(res, path);
            return val;
          }
          return res;
        }, data);
        return res;
      }
      return data;
    }
  }, {
    key: 'getPropData',
    value: function getPropData(raw) {
      var _props3 = this.props,
          formData = _props3.formData,
          data = _props3.data,
          dataRoot = _props3.dataRoot;

      var theData = formData || data;
      if (raw) {
        return theData;
      }
      if (theData && dataRoot) {
        return (0, _martingaleUtils.getObjectValue)(dataRoot, theData);
        //return theData[dataRoot];
      }
      return theData;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          children = _props4.children,
          schemaEncoder = _props4.schemaEncoder,
          uiSchemaEncoder = _props4.uiSchemaEncoder,
          formSchema = _props4.schema,
          _props4$stripInvalid = _props4.stripInvalid,
          stripInvalid = _props4$stripInvalid === undefined ? true : _props4$stripInvalid,
          props = _objectWithoutProperties(_props4, ['children', 'schemaEncoder', 'uiSchemaEncoder', 'schema', 'stripInvalid']);

      var data = this.getPropData();
      var schema = formSchema ? schemaEncoder ? schemaEncoder(formSchema) : formSchema : {};
      var uiSchema = formSchema ? uiSchemaEncoder ? uiSchemaEncoder(formSchema) : {} : {};
      var _state = this.state,
          value = _state.value,
          validationErrors = _state.errors;

      var errors = this.getErrorsPanel(validationErrors);
      var jsFormData = stripInvalid && data ? this.stripInvalid(data, schema) : data;
      var form = formSchema ? _react2.default.createElement(
        _reactJsonschemaForm2.default,
        Object.assign({
          uiSchema: uiSchema,
          schema: schema,
          formData: jsFormData,
          onSubmit: this.onSubmit.bind(this)
        }, props),
        children
      ) : undefined;
      return _react2.default.createElement(
        'div',
        null,
        errors,
        form
      );
    }
  }]);

  return BaseForm;
}(_react.Component);

;

var Form = (0, _reactRouterDom.withRouter)(BaseForm);

Form.propTypes = Object.assign({}, _reactJsonschemaForm2.default.propTypes, {
  schema: _propTypes2.default.object,
  dataRoot: _propTypes2.default.string,
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  schemaEncoder: _propTypes2.default.func,
  uiSchemaEncoder: _propTypes2.default.func,
  successUrl: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  submitTo: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  stripInvalid: _propTypes2.default.bool,
  mapper: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func
});

exports.default = Form;