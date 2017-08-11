'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var toString = function toString(data) {
  var type = (0, _martingaleUtils.betterType)(data);
  if (type === 'null') {
    return 'null';
  }
  if (type === 'undefined') {
    return 'undefined';
  }
  return data.toString ? data.toString() : 'Can\'t convert type "' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)) + '"';
};

var ViewContents = function ViewContents(_ref) {
  var data = _ref.data,
      actions = _ref.actions,
      footerContents = _ref.footerContents,
      _ref$nowrap = _ref.nowrap,
      nowrap = _ref$nowrap === undefined ? false : _ref$nowrap,
      _ref$inset = _ref.inset,
      inset = _ref$inset === undefined ? true : _ref$inset,
      _ref$__level = _ref.__level,
      __level = _ref$__level === undefined ? 0 : _ref$__level,
      props = _objectWithoutProperties(_ref, ['data', 'actions', 'footerContents', 'nowrap', 'inset', '__level']);

  var dataType = (0, _martingaleUtils.betterType)(data);
  var wrap = function wrap(children, _ref2) {
    var inset = _ref2.inset;

    if (nowrap) {
      return _react2.default.createElement(
        'div',
        { className: 'dataView level-' + __level },
        children
      );
    }
    return _react2.default.createElement(
      _Panel2.default,
      { inset: inset },
      _react2.default.createElement(
        'div',
        { className: 'dataView level-' + __level },
        children,
        footerContents
      )
    );
  };
  if (dataType === 'array') {
    var showPagination = data.length > 20;
    if (actions) {
      return wrap(_react2.default.createElement(_actiontable.ActionTable, Object.assign({ data: data, actions: actions, filterable: false, showPagination: showPagination }, props)), { inset: false });
    }
    return wrap(_react2.default.createElement(_table.Table, Object.assign({ data: data, filterable: false, showPagination: showPagination }, props)), { inset: false });
  }
  if (dataType === 'object') {
    var keys = Object.keys(data);
    var children = keys.map(function (key) {
      var value = _react2.default.createElement(ViewContents, { data: data[key], inset: false, nowrap: true, __level: __level + 1 });
      return [_react2.default.createElement(
        'dt',
        { key: key, className: 'level-' + __level },
        key
      ), _react2.default.createElement(
        'dd',
        { key: key + '-value', className: 'level-' + __level },
        value
      )];
    });
    var objectList = _react2.default.createElement(
      'dl',
      { className: nowrap ? 'inset-children level-' + __level : 'level-' + __level },
      children
    );
    return wrap(objectList, { inset: inset });
  }
  return wrap(_react2.default.createElement(
    'span',
    { className: 'inset level-' + __level },
    toString(data)
  ), { inset: inset });
};

var DataView = function DataView(props) {
  var inset = props.inset,
      data = props.data,
      footerContents = props.footerContents,
      View = props.View;

  if (typeof data === 'undefined') {
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
  if (View) {
    return _react2.default.createElement(View, props);
  }
  return _react2.default.createElement(ViewContents, props);
};

exports.default = DataView;