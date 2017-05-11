'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _martingaleUtils = require('martingale-utils');

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseForm = function (_Component) {
  _inherits(BaseForm, _Component);

  function BaseForm() {
    _classCallCheck(this, BaseForm);

    return _possibleConstructorReturn(this, (BaseForm.__proto__ || Object.getPrototypeOf(BaseForm)).apply(this, arguments));
  }

  _createClass(BaseForm, [{
    key: 'onSubmit',
    value: function onSubmit(_ref) {
      var formData = _ref.formData;
      var _props = this.props,
          successUrl = _props.successUrl,
          submitTo = _props.submitTo,
          history = _props.history,
          mapper = _props.mapper,
          onSubmit = _props.onSubmit;

      var data = mapper ? mapper(formData) : formData;
      if (onSubmit) {
        return onSubmit(data);
      }
      if (submitTo) {
        var _ref2 = typeof submitTo === 'string' ? { url: submitTo } : submitTo,
            _ref2$method = _ref2.method,
            method = _ref2$method === undefined ? 'POST' : _ref2$method,
            url = _ref2.url;
        // do something with fetch here

      }
      if (typeof successUrl === 'function') {
        return history.push(successUrl(data));
      }
      history.push(successUrl || '/');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          schemaEncoder = _props2.schemaEncoder,
          formSchema = _props2.schema,
          formData = _props2.formData,
          data = _props2.data,
          props = _objectWithoutProperties(_props2, ['children', 'schemaEncoder', 'schema', 'formData', 'data']);

      var schema = formSchema ? schemaEncoder ? schemaEncoder(formSchema) : formSchema : {};
      return _react2.default.createElement(
        _reactJsonschemaForm2.default,
        Object.assign({
          schema: schema,
          formData: formData || data,
          onSubmit: this.onSubmit.bind(this)
        }, props),
        children
      );
    }
  }]);

  return BaseForm;
}(_react.Component);

;

var Form = (0, _reactRouterDom.withRouter)(BaseForm);

Form.propTypes = Object.assign({}, _reactJsonschemaForm2.default.propTypes, {
  schema: _propTypes2.default.object,
  data: _propTypes2.default.oneOfType(_propTypes2.default.object, _propTypes2.default.array),
  schemaEncoder: _propTypes2.default.func,
  successUrl: _propTypes2.default.oneOfType(_propTypes2.default.string, _propTypes2.default.func),
  submitTo: _propTypes2.default.oneOfType(_propTypes2.default.string, _propTypes2.default.object),
  mapper: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func
});

exports.default = Form;