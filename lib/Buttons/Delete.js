'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('@martingale/utils');

var _Confirm = require('./Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Generates a button that when clicked performs an HTTP DELETE on the target.
 * @name DeleteButton
 * @param {object} props
 * @param {string} props.caption - Text to display on the button
 * @param {string} props.title - Title to place in the confirmation dialog box
 * @param {string} props.message - Text to display within the dialog box
 * @param {string} props.successUrl - URL to navigate to on a successful delete operation
 * @extends Button
 */

var DButton = function (_Component) {
  _inherits(DButton, _Component);

  function DButton() {
    _classCallCheck(this, DButton);

    return _possibleConstructorReturn(this, (DButton.__proto__ || Object.getPrototypeOf(DButton)).apply(this, arguments));
  }

  _createClass(DButton, [{
    key: 'performDelete',
    value: function performDelete() {
      var _props = this.props,
          url = _props.target,
          _props$successUrl = _props.successUrl,
          successUrl = _props$successUrl === undefined ? window.location.pathname || '/' : _props$successUrl,
          history = _props.history,
          headers = _props.headers;

      if (!url) {
        return false;
      }
      (0, _utils.fetchJson)({
        url: url,
        method: 'DELETE',
        headers: headers,
        callback: function callback(err, payload, res, contentType) {
          if (err) {
            return console.error(err);
          }
          history.push(successUrl);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$caption = _props2.caption,
          caption = _props2$caption === undefined ? 'Delete' : _props2$caption,
          _props2$title = _props2.title,
          title = _props2$title === undefined ? 'Are you sure?' : _props2$title,
          _props2$message = _props2.message,
          message = _props2$message === undefined ? 'Are you sure you want to delete?' : _props2$message,
          target = _props2.target,
          successUrl = _props2.successUrl,
          history = _props2.history,
          match = _props2.match,
          location = _props2.location,
          staticContext = _props2.staticContext,
          props = _objectWithoutProperties(_props2, ['caption', 'title', 'message', 'target', 'successUrl', 'history', 'match', 'location', 'staticContext']);

      return _react2.default.createElement(_Confirm2.default, Object.assign({
        btnStyle: 'danger',
        caption: caption,
        title: title,
        message: message,
        onYes: this.performDelete.bind(this)
      }, props));
    }
  }]);

  return DButton;
}(_react.Component);

var DeleteButton = (0, _reactRouterDom.withRouter)(DButton);

DeleteButton.propTypes = Object.assign({}, _Confirm2.default.propTypes, {
  caption: _propTypes2.default.string,
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  target: _propTypes2.default.string,
  successUrl: _propTypes2.default.string
});

exports.default = DeleteButton;