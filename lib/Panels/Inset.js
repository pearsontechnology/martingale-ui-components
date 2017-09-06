'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A container to be placed within a panel that insets the contents
 * @param {object} props
 * @param {object} props.children - Children to be placed within the panel
 */

var Inset = function Inset(props) {
  var children = props.children;

  return _react2.default.createElement(
    'div',
    { className: 'panel-body' },
    children
  );
};

Inset.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = Inset;