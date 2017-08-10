'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Panel = require('../Panels/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _table = require('../Tables/table');

var _actiontable = require('../Tables/actiontable');

var _jsonview = require('../JsonView/jsonview');

var _jsonview2 = _interopRequireDefault(_jsonview);

var _martingaleUtils = require('martingale-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DataView = function DataView(_ref) {
  var data = _ref.data,
      actions = _ref.actions,
      footerContents = _ref.footerContents,
      _ref$inset = _ref.inset,
      inset = _ref$inset === undefined ? true : _ref$inset,
      props = _objectWithoutProperties(_ref, ['data', 'actions', 'footerContents', 'inset']);

  if (!data) {
    return _react2.default.createElement(
      _Panel2.default,
      { inset: true },
      _react2.default.createElement(
        'span',
        { className: 'loading' },
        'Loading...'
      )
    );
  }
  var dataType = (0, _martingaleUtils.betterType)(data);
  var wrap = function wrap(children, _ref2) {
    var _ref2$inset = _ref2.inset,
        inset = _ref2$inset === undefined ? true : _ref2$inset;

    return _react2.default.createElement(
      _Panel2.default,
      { inset: inset },
      children,
      footerContents
    );
  };
  if (dataType === 'array') {
    if (actions) {
      return wrap(_react2.default.createElement(_actiontable.ActionTable, Object.assign({ data: data, actions: actions }, props)), { inset: false });
    }
    return wrap(_react2.default.createElement(_table.Table, Object.assign({ data: data }, props)), { inset: false });
  }
  return wrap(_react2.default.createElement(_jsonview2.default, Object.assign({ json: data, inset: true }, props)), { inset: inset });
};

exports.default = DataView;