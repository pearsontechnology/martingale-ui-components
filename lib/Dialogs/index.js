"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Dialog = require("./Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Confirm = require("./Confirm");

var _Confirm2 = _interopRequireDefault(_Confirm);

var _Info = require("./Info");

var _Info2 = _interopRequireDefault(_Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  BaseDialog: _Dialog2.default,
  ConfirmDialog: _Confirm2.default
};