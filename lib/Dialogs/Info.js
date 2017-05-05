'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DEFAULT_ACTIONS = {
  'Ok': function Ok(dialog) {
    if (dialog.props.onOk) {
      return dialog.props.onOk(dialog);
    }
    dialog.hide();
  }
};

var Dialog = function Dialog(_ref) {
  var title = _ref.title,
      children = _ref.children,
      message = _ref.message,
      _ref$actions = _ref.actions,
      actions = _ref$actions === undefined ? DEFAULT_ACTIONS : _ref$actions,
      props = _objectWithoutProperties(_ref, ['title', 'children', 'message', 'actions']);

  return _react2.default.createElement(
    _Dialog2.default,
    Object.assign({ title: title, actions: actions, message: message }, props),
    children
  );
};

Dialog.propTypes = Object.assign({}, _Dialog2.default.propTypes, {
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  actions: _propTypes2.default.object,
  onOk: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
});

exports.default = Dialog;