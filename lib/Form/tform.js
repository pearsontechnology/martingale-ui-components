'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TForm = exports.Form = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tcombForm = require('tcomb-form');

var _tcombForm2 = _interopRequireDefault(_tcombForm);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fetch = require('../fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormRender = _tcombForm2.default.form.Form;

var BareSchema = _tcombForm2.default.struct({});

var BaseForm = function (_React$Component) {
  _inherits(BaseForm, _React$Component);

  function BaseForm(props) {
    _classCallCheck(this, BaseForm);

    var _this = _possibleConstructorReturn(this, (BaseForm.__proto__ || Object.getPrototypeOf(BaseForm)).call(this));

    _this.state = { value: props.value };
    return _this;
  }

  _createClass(BaseForm, [{
    key: 'onSubmit',
    value: function onSubmit(evt) {
      evt && evt.preventDefault();
      var valid = this.form.validate();
      //console.log('Valid?: ', JSON.stringify(valid, null, 2))
      if (valid && valid.errors && valid.errors.length) {
        return this.setState(valid);
      }
      var value = valid.value;
      if (value) {
        if (this.props.onSubmit) {
          this.props.onSubmit(evt, value);
        }

        if (this.props.submitTo) {
          var history = this.props.history;
          var setState = this.setState.bind(this);
          var _props$submitTo = this.props.submitTo,
              _props$submitTo$metho = _props$submitTo.method,
              method = _props$submitTo$metho === undefined ? 'post' : _props$submitTo$metho,
              url = _props$submitTo.url,
              successUrl = _props$submitTo.successUrl,
              mapper = _props$submitTo.mapper;

          if (!url) {
            throw new Error('No URL provided to submit to.');
          }
          (0, _fetch.postJson)({
            url: url,
            method: method,
            payload: mapper ? mapper(value) : value,
            callback: function callback(err, payload, res) {
              if (err) {
                return console.error(err);
              }
              if (!res.ok) {
                return setState({ errors: payload });
              }
              if (successUrl) {
                history.push(successUrl);
              }
            }
          });
        }
      }
      //console.log(valid);
      return this.setState(valid);
    }
  }, {
    key: 'getErrorPanel',
    value: function getErrorPanel(err) {
      var message = typeof err === 'string' ? err : err.message || err.toString();
      var path = Array.isArray(err.path) ? err.path.join('/') : err.key || message;
      return _react2.default.createElement(
        'div',
        { className: 'validation-error', key: path },
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
      return _react2.default.createElement(
        'div',
        { className: 'validation-errors' },
        _react2.default.createElement(
          'div',
          { className: 'validation-error' },
          errors
        ),
        ';'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          _props$schema = _props.schema,
          schema = _props$schema === undefined ? BareSchema : _props$schema,
          props = _objectWithoutProperties(_props, ['schema']);

      var _state = this.state,
          value = _state.value,
          validationErrors = _state.errors;

      var errors = this.getErrorsPanel(validationErrors);

      return _react2.default.createElement(
        'form',
        { onSubmit: this.onSubmit.bind(this) },
        errors,
        _react2.default.createElement(FormRender, Object.assign({ ref: function ref(form) {
            return _this3.form = form;
          }, type: schema, value: value }, props)),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary' },
            'Save'
          )
        )
      );
    }
  }]);

  return BaseForm;
}(_react2.default.Component);

BaseForm.propTypes = {
  schema: _propTypes2.default.object,
  value: _propTypes2.default.any,
  onSubmit: _propTypes2.default.func,
  submitTo: _propTypes2.default.shape({
    method: _propTypes2.default.string,
    url: _propTypes2.default.string,
    successUrl: _propTypes2.default.string,
    mapper: _propTypes2.default.func
  })
};
;

var Form = (0, _reactRouterDom.withRouter)(BaseForm);
Form.propTypes = BaseForm.propTypes;

exports.Form = Form;
exports.TForm = _tcombForm2.default;