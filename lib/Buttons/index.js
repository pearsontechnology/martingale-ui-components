'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Confirm = require('./Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

var _Info = require('./Info');

var _Info2 = _interopRequireDefault(_Info);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Button: _Button2.default,
  ConfirmButton: _Confirm2.default,
  InfoButton: _Info2.default
};