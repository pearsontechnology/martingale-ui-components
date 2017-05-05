'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PanelFooter = function PanelFooter(props) {
  var _props$className = props.className,
      className = _props$className === undefined ? '' : _props$className,
      Component = props.Component,
      children = props.children,
      rest = _objectWithoutProperties(props, ['className', 'Component', 'children']);

  var contents = Component ? _react2.default.createElement(Component, rest) : children;
  return _react2.default.createElement(
    'div',
    { className: _classnames2.default.apply(undefined, ['panel-footer'].concat(_toConsumableArray(className.split(/[ \t]+/)))) },
    contents,
    _react2.default.createElement('div', { className: 'clearfix' })
  );
};

PanelFooter.propTypes = {
  className: _propTypes2.default.string,
  Component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]),
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = PanelFooter;