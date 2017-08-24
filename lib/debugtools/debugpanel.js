'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DebugPanel = function DebugPanel(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'pre',
      null,
      JSON.stringify(props, null, 2)
    )
  );
};

exports.default = DebugPanel;