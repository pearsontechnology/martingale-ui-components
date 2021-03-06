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

var _yamlview = require('../YamlView/yamlview');

var _yamlview2 = _interopRequireDefault(_yamlview);

var _tabs = require('../tabs/tabs');

var _error = require('../error/error');

var _error2 = _interopRequireDefault(_error);

var _actions = require('../actions/actions');

var _actions2 = _interopRequireDefault(_actions);

var _utils = require('@martingale/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var toString = function toString(data) {
  var type = (0, _utils.betterType)(data);
  if (type === 'null') {
    return 'null';
  }
  if (type === 'undefined') {
    return 'undefined';
  }
  return data.toString ? data.toString() : 'Can\'t convert type "' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)) + '"';
};

var getDefaultKey = function getDefaultKey() {
  var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!columns || columns.length === 0) {
    return defaultValue;
  }
  var first = columns[0];
  if (typeof first === 'string') {
    return first;
  }
  if (first.caption) {
    return first.caption;
  }
  return defaultValue;
};

var ViewContents = function ViewContents(_ref) {
  var data = _ref.data,
      _ref$viewOptions = _ref.viewOptions,
      viewOptions = _ref$viewOptions === undefined ? true : _ref$viewOptions,
      actions = _ref.actions,
      footerContents = _ref.footerContents,
      footerActions = _ref.footerActions,
      _ref$nowrap = _ref.nowrap,
      nowrap = _ref$nowrap === undefined ? false : _ref$nowrap,
      _ref$inset = _ref.inset,
      inset = _ref$inset === undefined ? true : _ref$inset,
      _ref$__level = _ref.__level,
      __level = _ref$__level === undefined ? 0 : _ref$__level,
      props = _objectWithoutProperties(_ref, ['data', 'viewOptions', 'actions', 'footerContents', 'footerActions', 'nowrap', 'inset', '__level']);

  var footer = footerContents ? footerContents : footerActions ? _react2.default.createElement(_actions2.default, { actions: footerActions }) : '';
  var dataType = (0, _utils.betterType)(data);
  var wrap = function wrap(children, _ref2) {
    var _React$createElement;

    var inset = _ref2.inset;

    if (nowrap) {
      return _react2.default.createElement(
        'div',
        { className: 'dataView level-' + __level },
        children
      );
    }
    if (!viewOptions) {
      return _react2.default.createElement(
        _Panel2.default,
        { inset: inset },
        children,
        footer
      );
    }
    var tabs = [{
      title: 'Default',
      children: children
    }, {
      title: 'JSON',
      children: _react2.default.createElement(_jsonview2.default, { data: data })
    }, {
      title: 'YAML',
      children: _react2.default.createElement(_yamlview2.default, { data: data })
    }];
    return _react2.default.createElement(_tabs.Tabs, (_React$createElement = { inset: inset, tabs: tabs }, _defineProperty(_React$createElement, 'inset', false), _defineProperty(_React$createElement, 'footer', footer), _React$createElement));
  };
  if (dataType === 'array') {
    var showPagination = data.length > 20;
    var key = getDefaultKey(props.columns);
    data = data.map(function (item) {
      if (typeof item === 'string') {
        return _defineProperty({}, key, item);
      }
      return item;
    });
    if (actions) {
      return wrap(_react2.default.createElement(_actiontable.ActionTable, Object.assign({ data: data, actions: actions, filterable: showPagination, showPagination: showPagination }, props)), { inset: false });
    }
    return wrap(_react2.default.createElement(_table.Table, Object.assign({ data: data, filterable: showPagination, showPagination: showPagination }, props)), { inset: false });
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

/**
 * Creates an appropriate view of the passed in data, for Arrays will display a table, for Objects will display a hybrid display.
 * @param {object} props
 * @param {boolean} props.inset - Should the content be inset
 * @param {any} props.data - Data to be displayed on the screen
 * @param {any} props.footerContents - Any contents that should be placed in the footer of the view
 * @param {any} props.footerActions - Actions that should be placed in the footer of the view
 * @param {Component} props.View - Force the view by supplying the type
 */
var DataView = function DataView(props) {
  var inset = props.inset,
      data = props.data,
      footerContents = props.footerContents,
      footerActions = props.footerActions,
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
  if (data.statusCode && data.error && data.message) {
    return _react2.default.createElement(_error2.default, { error: data });
  }
  if (View) {
    return _react2.default.createElement(View, props);
  }
  return _react2.default.createElement(ViewContents, props);
};

exports.default = DataView;