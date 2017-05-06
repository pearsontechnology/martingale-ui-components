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

var _Info = require('../Dialogs/Info');

var _Info2 = _interopRequireDefault(_Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoButton = function (_React$Component) {
  _inherits(InfoButton, _React$Component);

  function InfoButton(_ref) {
    var _ref$dialogOpen = _ref.dialogOpen,
        dialogOpen = _ref$dialogOpen === undefined ? false : _ref$dialogOpen;

    _classCallCheck(this, InfoButton);

    var _this = _possibleConstructorReturn(this, (InfoButton.__proto__ || Object.getPrototypeOf(InfoButton)).call(this));

    _this.state = { isDialogOpen: dialogOpen };
    return _this;
  }

  _createClass(InfoButton, [{
    key: 'handleOk',
    value: function handleOk(dialog) {
      if (this.props.onOk) {
        return this.props.onOk(this);
      }
      this.setState({ isDialogOpen: false });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(dialog) {
      if (this.props.onCancel) {
        return this.props.onCancel(this);
      }
      if (this.props.onOk) {
        return this.props.onOk(this);
      }
      this.setState({ isDialogOpen: false });
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({ isDialogOpen: true });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({ isDialogOpen: false });
    }
  }, {
    key: 'showDialog',
    value: function showDialog(e) {
      e.preventDefault();
      this.setState({ isDialogOpen: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          caption = _props.caption,
          dialogTitle = _props.dialogTitle,
          dialogMessage = _props.dialogMessage,
          onOk = _props.onOk,
          props = _objectWithoutProperties(_props, ['children', 'caption', 'dialogTitle', 'dialogMessage', 'onOk']);

      var contents = caption || children;
      var isDialogOpen = this.state.isDialogOpen;

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(_Info2.default, {
          visible: isDialogOpen,
          title: dialogTitle,
          message: dialogMessage,
          onOk: this.handleOk.bind(this),
          onCancel: this.handleCancel.bind(this) }),
        _react2.default.createElement(
          _Button2.default,
          Object.assign({ onClick: this.showDialog.bind(this) }, props),
          contents
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
  dialogOpen: _propTypes2.default.bool,
  dialogTitle: _propTypes2.default.string,
  dialogMessage: _propTypes2.default.string,
  caption: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
});

exports.default = InfoButton;