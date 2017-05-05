'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Text = function Text(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === undefined ? 'span' : _ref$Component,
      value = _ref.value,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ['Component', 'value', 'children']);

  var displayValue = value || children;
  return _react2.default.createElement(
    Component,
    props,
    displayValue
  );
};

Text.propTypes = {
  value: _propTypes2.default.string,
  className: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]),
  Component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};

exports.default = Text;