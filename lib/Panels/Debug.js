'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/Panels/Debug.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _JsonView = require('../JsonView');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DebugPanel = function DebugPanel(props) {
  console.log('Debug', props);
  return _react2.default.createElement(_JsonView.JsonView, { json: props, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  });
};

exports.default = DebugPanel;