'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('../Dialogs/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_ACTIONS = {
  'Ok': function Ok(dialog) {
    if (dialog.props.onOk) {
      return dialog.props.onOk(dialog);
    }
    dialog.close && dialog.close();
  }
};

var InfoButton = function (_React$Component) {
  _inherits(InfoButton, _React$Component);

  function InfoButton() {
    _classCallCheck(this, InfoButton);

    return _possibleConstructorReturn(this, (InfoButton.__proto__ || Object.getPrototypeOf(InfoButton)).apply(this, arguments));
  }

  _createClass(InfoButton, [{
    key: 'handleOk',
    value: function handleOk(dialog) {
      if (this.props.onOk) {
        return this.props.onOk(dialog);
      }
      this.close();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(dialog) {
      if (this.props.onCancel) {
        return this.props.onCancel(dialog);
      }
      if (this.props.onOk) {
        return this.props.onOk(dialog);
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
          _props$actions = _props.actions,
          actions = _props$actions === undefined ? DEFAULT_ACTIONS : _props$actions,
          onOk = _props.onOk,
          props = _objectWithoutProperties(_props, ['children', 'caption', 'title', 'message', 'visible', 'actions', 'onOk']);

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
          onOk: this.handleOk.bind(this),
          onCancel: this.handleCancel.bind(this) }),
        _react2.default.createElement(
          _Button2.default,
          Object.assign({ onClick: this.showDialog.bind(this) }, props),
          caption
        )
      );
    }
  }]);

  return InfoButton;
}(_react2.default.Component);

;

InfoButton.propTypes = Object.assign({}, _Button2.default.propTypes, {
  onOk: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  visible: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  caption: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
});

exports.default = InfoButton;