'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Alerts = require('../Alerts/Alerts');

var _Alerts2 = _interopRequireDefault(_Alerts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function Error(_ref) {
  var error = _ref.error;

  if (typeof error === 'string') {
    return _react2.default.createElement(
      _Alerts2.default,
      { type: 'danger' },
      error
    );
  }
  if (error.error && error.statusCode && error.message) {
    return _react2.default.createElement(
      _Alerts2.default,
      { type: 'danger' },
      _react2.default.createElement(
        'strong',
        null,
        error.error,
        ' (',
        error.statusCode,
        '):'
      ),
      ' ',
      error.message
    );
  }
  if (error.error && error.message) {
    return _react2.default.createElement(
      _Alerts2.default,
      { type: 'danger' },
      _react2.default.createElement(
        'strong',
        null,
        error.error,
        ':'
      ),
      ' ',
      error.message
    );
  }
  if (error.message) {
    return _react2.default.createElement(
      _Alerts2.default,
      { type: 'danger' },
      error.message
    );
  }
  return _react2.default.createElement(
    _Alerts2.default,
    { type: 'danger' },
    _react2.default.createElement(
      'pre',
      null,
      JSON.stringify(error, null, 2)
    )
  );
};

exports.default = Error;