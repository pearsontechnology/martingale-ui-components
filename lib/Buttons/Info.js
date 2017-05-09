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
  var onOk = _ref.onOk;

  return {
    'Ok': function Ok(dialog) {
      if (onOk) {
        return onOk(dialog);
      }
      dialog.close && dialog.close();
    }
  };
};

var InfoButton = function InfoButton(_ref2) {
  var onOk = _ref2.onOk,
      passedActions = _ref2.actions,
      props = _objectWithoutProperties(_ref2, ['onOk', 'actions']);

  var actions = passedActions || defaultActions({ onOk: onOk });
  return _react2.default.createElement(_DialogButton2.default, Object.assign({
    actions: actions
  }, props));
};

InfoButton.propTypes = Object.assign({}, _DialogButton2.default.propTypes, {
  onOk: _propTypes2.default.func
});

exports.default = InfoButton;