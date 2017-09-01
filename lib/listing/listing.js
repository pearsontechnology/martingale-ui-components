'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(children, item) {
  var childList = Array.isArray(children) ? children : [children];
  return childList.map(function (Child, index) {
    if (typeof Child === 'function') {
      return _react2.default.createElement(Child, item);
    }
    return Child;
  });
};

/**
 * Generates a list of Children from the list provided.
 * @param {object} props
 * @param {array} props.list - List of items to itterate over
 * @param {array} props.children - Collection of Components to render
 */
var Listing = function Listing(_ref) {
  var list = _ref.list,
      children = _ref.children;

  if (!list) {
    return _react2.default.createElement('div', null);
  }
  return _react2.default.createElement(
    'div',
    null,
    list.map(function (item, index) {
      return render(children, item);
    })
  );
};

exports.default = Listing;