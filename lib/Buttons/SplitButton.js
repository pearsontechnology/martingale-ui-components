'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var UiSplitButton = function UiSplitButton(props) {
  var children = props.children,
      btnStyle = props.btnStyle,
      args = _objectWithoutProperties(props, ['children', 'btnStyle']);

  return _react2.default.createElement(
    _reactBootstrap.SplitButton,
    Object.assign({ bsStyle: btnStyle }, args),
    children
  );
};

UiSplitButton.propTypes = Object.assign({}, _reactBootstrap.SplitButton.propTypes, {
  btnStyle: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
});

exports.default = UiSplitButton;