'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kongform = require('./kongform');

var _kongform2 = _interopRequireDefault(_kongform);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Form: _form2.default,
  KongForm: _kongform2.default
};