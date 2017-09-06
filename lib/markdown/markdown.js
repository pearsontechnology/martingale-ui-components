'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _html = require('../html');

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = (0, _markdownIt2.default)();

/**
 * Renders MarkDown directly
 * @name MarkDown
 * @param {object} props
 * @param {string} props.children - Markdown to be displayed
 */

var MarkDown = function MarkDown(_ref) {
  var src = _ref.children;

  var html = md.render(src);
  return _react2.default.createElement(
    _html2.default,
    null,
    html
  );
};

exports.default = MarkDown;