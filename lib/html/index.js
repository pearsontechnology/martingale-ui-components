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

var DisplayHtml = function DisplayHtml(_ref) {
  var children = _ref.children;
  return _react2.default.createElement("div", { className: "embedded-html", dangerouslySetInnerHTML: createMarkup(children) });
};

exports.default = DisplayHtml;