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

var _Dialog = require('../Dialogs/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _DialogButton = function (_React$Component) {
  _inherits(_DialogButton, _React$Component);

  function _DialogButton() {
    _classCallCheck(this, _DialogButton);

    return _possibleConstructorReturn(this, (_DialogButton.__proto__ || Object.getPrototypeOf(_DialogButton)).apply(this, arguments));
  }

  _createClass(_DialogButton, [{
    key: 'handleCancel',
    value: function handleCancel(dialog) {
      if (this.props.onCancel) {
        return this.props.onCancel.bind(this)(dialog);
      }
      this.close();
    }
  }, {
    key: 'open',
    value: function open() {
      this.dialog.open();
    }
  }, {
    key: 'close',
    value: function close() {
      this.dialog.close();
    }
  }, {
    key: 'showDialog',
    value: function showDialog(e) {
      e && e.preventDefault();
      this.open();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          caption = _props.caption,
          title = _props.title,
          message = _props.message,
          visible = _props.visible,
          actions = _props.actions,
          onCancel = _props.onCancel,
          prefetch = _props.prefetch,
          match = _props.match,
          location = _props.location,
          history = _props.history,
          staticContext = _props.staticContext,
          props = _objectWithoutProperties(_props, ['children', 'caption', 'title', 'message', 'visible', 'actions', 'onCancel', 'prefetch', 'match', 'location', 'history', 'staticContext']);

      var contents = message || children;
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_Dialog2.default, {
          ref: function ref(dialog) {
            return _this2.dialog = dialog;
          },
          actions: actions,
          visible: visible,
          title: title,
          message: contents,
          onHide: this.handleCancel.bind(this),
          onCancel: this.handleCancel.bind(this) }),
        _react2.default.createElement(
          _Button2.default,
          Object.assign({ onClick: this.showDialog.bind(this) }, props),
          caption
        )
      );
    }
  }]);

  return _DialogButton;
}(_react2.default.Component);

;

/**
 * Generates a button that when clicked prompts the user with a dialog.
 * @param {object} props
 * @param {function} props.onCancel - Callbacked when user cancels the dialog
 * @param {array} props.children - Array of children to be placed into the body of the dialog
 * @param {string} props.caption - Caption to put on the button
 * @param {string} props.title - Title of the dialog when it is displayed
 * @param {string} props.message - Message to be displayed (instead of using children) inside the dialog
 * @param {boolean} props.visible - Show the dialog
 * @param {array} props.actions - Array of actions to place in the dialog
 * @param {object} props.fetch - Hash of remote requests to fetch before showing dialog
*/
var DialogButton = (0, _reactRouterDom.withRouter)(_DialogButton);

DialogButton.propTypes = Object.assign({}, _Button2.default.propTypes, {
  onCancel: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
  visible: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  caption: _propTypes2.default.string,
  prefetch: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
});

exports.default = DialogButton;