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

var _reactModalBootstrap = require('react-modal-bootstrap');

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createActionHandler = function createActionHandler(actionName, action, dialog) {
  if (!action) {
    throw new Error('Malformed action ' + actionName);
  }
  var handler = action.handler || action;
  if (typeof handler === 'function') {
    return function (e) {
      e && e.preventDefault();
      handler.bind(this)(dialog);
    };
  }
  throw new Error('No handler specified on action: ' + actionName);
};

var getDialogFooter = function getDialogFooter(footer, actions, dialog) {
  if (footer) {
    return _react2.default.createElement(
      _reactModalBootstrap.Modal.Footer,
      null,
      footer
    );
  }
  if (actions) {
    var actionButtons = Object.keys(actions).map(function (actionName) {
      var action = actions[actionName];
      return _react2.default.createElement(
        _Button2.default,
        { key: actionName,
          onClick: createActionHandler(actionName, action, dialog),
          className: 'btn btn-' + (action.btnStyle || 'primary') },
        actionName
      );
    });
    return _react2.default.createElement(
      _reactModalBootstrap.ModalFooter,
      null,
      actionButtons
    );
  }
  return '';
};

/**
 * Generates a dialog for the user to interact with.
 * @param {object} props
 * @param {function} props.onHide - Callbacked when the dialog should be hidden
 * @param {array} props.children - Array of children to be placed into the body of the dialog
 * @param {string} props.title - Title of the dialog when it is displayed
 * @param {string} props.message - Message to be displayed (instead of using children) inside the dialog
 * @param {array} props.actions - Array of actions to place in the dialog
 * @param {Component} props.footer - Content to put in the footer of the dialog
*/

var Dialog = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(_ref) {
    var _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? false : _ref$visible,
        title = _ref.title,
        message = _ref.message,
        children = _ref.children,
        footer = _ref.footer,
        actions = _ref.actions,
        onHide = _ref.onHide;

    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

    _this.contents = message || children;
    _this.state = { visible: visible };
    _this.footer = getDialogFooter(footer, actions, _this);
    return _this;
  }

  _createClass(Dialog, [{
    key: 'close',
    value: function close() {
      return this.setState({ visible: false });
    }
  }, {
    key: 'open',
    value: function open() {
      return this.setState({ visible: true });
    }
  }, {
    key: 'requestHide',
    value: function requestHide() {
      if (typeof this.props.onHide === 'function') {
        return this.props.onHide.bind(this)(this);
      }
      return this.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          onHide = _props.onHide;
      var visible = this.state.visible;
      var contents = this.contents,
          footer = this.footer;
      //<Modal isOpen={visible} onHide={this.close.bind(this)}>

      return _react2.default.createElement(
        _reactModalBootstrap.Modal,
        { isOpen: visible, onRequestHide: this.requestHide.bind(this) },
        _react2.default.createElement(
          _reactModalBootstrap.ModalHeader,
          null,
          _react2.default.createElement(
            _reactModalBootstrap.ModalTitle,
            null,
            title
          )
        ),
        _react2.default.createElement(
          _reactModalBootstrap.ModalBody,
          null,
          contents
        ),
        footer
      );
    }
  }]);

  return Dialog;
}(_react.Component);

;

Dialog.propTypes = {
  visible: _propTypes2.default.bool,
  onHide: _propTypes2.default.func,
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  actions: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = Dialog;