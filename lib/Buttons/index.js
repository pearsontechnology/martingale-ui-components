'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Confirm = require('./Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _DialogButton = require('./DialogButton');

var _DialogButton2 = _interopRequireDefault(_DialogButton);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//console.log('DialogButton', DialogButton);

exports.default = {
  Button: _Button2.default,
  ConfirmButton: _Confirm2.default,
  DialogButton: _DialogButton2.default,
  InfoButton: _Info2.default
};