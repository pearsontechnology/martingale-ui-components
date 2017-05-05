'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var def = function def(val, _def) {
  return typeof val !== 'undefined' ? val : _def;
};

var GridCol = function GridCol(compProps) {
  var defSize = compProps.size,
      defLgSize = compProps.lg,
      defMdSize = compProps.md,
      defSmSize = compProps.sm,
      defXsSize = compProps.xs,
      children = compProps.children,
      props = _objectWithoutProperties(compProps, ['size', 'lg', 'md', 'sm', 'xs', 'children']);

  var size = def(defSize, 12);
  var xsSize = def(defXsSize, size);
  var smSize = def(defSmSize, xsSize);
  var mdSize = def(defMdSize, smSize);
  var lgSize = def(defLgSize, mdSize);
  var sizes = {
    lg: lgSize,
    md: mdSize,
    sm: smSize,
    xs: xsSize
  };
  return _react2.default.createElement(
    _reactBootstrap.Col,
    Object.assign({}, sizes, props),
    children
  );
};

GridCol.propTypes = {
  size: _propTypes2.default.number,
  lg: _propTypes2.default.number,
  md: _propTypes2.default.number,
  sm: _propTypes2.default.number,
  sx: _propTypes2.default.number,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = GridCol;