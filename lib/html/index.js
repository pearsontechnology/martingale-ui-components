"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createMarkup = function createMarkup(children) {
  return { __html: children };
};

/**
 * Renders HTML directly
 * @name HTML
 * @param {object} props
 * @param {string} props.className - HTML Class Name, if not specified then 'embedded-html' is used
 * @param {string} props.children - HTML to be displayed
 */

var DisplayHtml = function DisplayHtml(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react2.default.createElement("div", { className: className || "embedded-html", dangerouslySetInnerHTML: createMarkup(children) });
};

exports.default = DisplayHtml;