'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/JsonView/jsonview.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsonview = require('./jsonview.css');

var _jsonview2 = _interopRequireDefault(_jsonview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTokenType = function getTokenType(token) {
  if (/^"/.test(token)) {
    if (/:$/.test(token)) {
      return 'key';
    }
    return 'string';
  }
  if (/true|false/.test(token)) {
    return 'boolean';
  }
  if (/null/.test(token)) {
    return 'null';
  }
  return 'number';
};

var syntaxHighlight = function syntaxHighlight(src) {
  var json = JSON.stringify(src, null, 2) || '';
  var html = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][-+]?\d+)?)/g, function (match) {
    var cls = getTokenType(match);
    return '<span class="json-view-' + cls + '">' + match + '</span>';
  });
  return _react2.default.createElement('pre', { className: 'json-view', dangerouslySetInnerHTML: { __html: html }, __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: undefined
  });
};

var JsonView = function JsonView(_ref) {
  var json = _ref.json,
      Viewer = _ref.Viewer;

  if (!Viewer) {
    return syntaxHighlight(json);
  }

  return _react2.default.createElement(Viewer, { json: json, __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: undefined
  });
};

exports.default = JsonView;