'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _Panel = require('../Panels/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _html = require('../html');

var _html2 = _interopRequireDefault(_html);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md = (0, _markdownIt2.default)({
  highlight: function highlight(str, lang) {
    if (lang && _highlight2.default.getLanguage(lang)) {
      try {
        return _highlight2.default.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

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
    _Panel2.default,
    { inset: true },
    _react2.default.createElement(
      _html2.default,
      null,
      html
    )
  );
};

exports.default = MarkDown;