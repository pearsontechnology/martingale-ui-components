'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DialogButton = require('./DialogButton');

var _DialogButton2 = _interopRequireDefault(_DialogButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var defaultActions = function defaultActions(_ref) {
  var onYes = _ref.onYes,
      onNo = _ref.onNo;

  return {
    'Yes': {
      btnStyle: 'success',
      handler: function handler(dialog) {
        if (onYes) {
          return onYes(dialog);
        }
        dialog.close();
      }
    },
    'No': {
      btnStyle: 'danger',
      handler: function handler(dialog) {
        if (onNo) {
          return onNo(dialog);
        }
        dialog.close();
      }
    }
  };
};

var ConfirmButton = function ConfirmButton(_ref2) {
  var onYes = _ref2.onYes,
      onNo = _ref2.onNo,
      passedActions = _ref2.actions,
      props = _objectWithoutProperties(_ref2, ['onYes', 'onNo', 'actions']);

  var actions = passedActions || defaultActions({ onYes: onYes, onNo: onNo });
  return _react2.default.createElement(_DialogButton2.default, Object.assign({
    actions: actions
  }, props));
};

ConfirmButton.propTypes = Object.assign({}, _DialogButton2.default.propTypes, {
  onYes: _propTypes2.default.func,
  onNo: _propTypes2.default.func
});

exports.default = ConfirmButton;