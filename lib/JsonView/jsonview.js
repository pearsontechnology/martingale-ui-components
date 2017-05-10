'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonView = function JsonView(_ref) {
  var json = _ref.json;

  return _react2.default.createElement(
    'pre',
    null,
    JSON.stringify(json, null, 2)
  );
};

JsonView.propTypes = {
  json: _propTypes2.default.any
};

exports.default = JsonView;