'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Count = require('./Count');

var _Count2 = _interopRequireDefault(_Count);

var _Inset = require('./Inset');

var _Inset2 = _interopRequireDefault(_Inset);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Panel: _Panel2.default,
  PanelHeader: _Header2.default,
  PanelFooter: _Footer2.default,
  PanelInset: _Inset2.default,
  PanelTitle: _Title2.default,
  CountPanel: _Count2.default
};