'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTable = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./table');

var _routerlink = require('../Router/routerlink');

var _routerlink2 = _interopRequireDefault(_routerlink);

var _martingaleUtils = require('martingale-utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Delete = require('../Buttons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _OptionsButton = require('../Buttons/OptionsButton');

var _OptionsButton2 = _interopRequireDefault(_OptionsButton);

var _MenuItem = require('../Menus/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var reToken = /\${([^}]+)}/g;
var ActionTable = function ActionTable(_ref) {
  var mapper = _ref.mapper,
      _ref$actions = _ref.actions,
      actions = _ref$actions === undefined ? [] : _ref$actions,
      columns = _ref.columns,
      props = _objectWithoutProperties(_ref, ['mapper', 'actions', 'columns']);

  var replaceTokens = function replaceTokens(source, data) {
    if (typeof source === 'undefined') {
      return source;
    }
    if (typeof source === 'function') {
      return source(data);
    }
    return source.replace(reToken, function (full, token) {
      return (0, _martingaleUtils.getObjectValue)(token, data);
    });
  };

  var createDropdownList = function createDropdownList(_ref2, index, data) {
    var caption = _ref2.caption,
        link = _ref2.link,
        _ref2$items = _ref2.items,
        listItems = _ref2$items === undefined ? [] : _ref2$items,
        btnStyle = _ref2.btnStyle,
        props = _objectWithoutProperties(_ref2, ['caption', 'link', 'items', 'btnStyle']);

    var linkTo = replaceTokens(link, data);
    var displayCaption = replaceTokens(caption, data);
    var items = listItems.map(function (item) {
      var link = item.link,
          caption = item.caption,
          props = _objectWithoutProperties(item, ['link', 'caption']);

      return Object.assign({
        link: replaceTokens(link, data),
        caption: replaceTokens(caption, data)
      }, props);
    });
    return _react2.default.createElement(_OptionsButton2.default, {
      key: index,
      caption: displayCaption,
      to: linkTo,
      items: items,
      btnStyle: btnStyle
    });
  };

  var createLinkAction = function createLinkAction(_ref3, index, data) {
    var caption = _ref3.caption,
        link = _ref3.link,
        _ref3$btnStyle = _ref3.btnStyle,
        btnStyle = _ref3$btnStyle === undefined ? 'default' : _ref3$btnStyle,
        items = _ref3.items,
        props = _objectWithoutProperties(_ref3, ['caption', 'link', 'btnStyle', 'items']);

    if (Array.isArray(items)) {
      return createDropdownList(Object.assign({ caption: caption, link: link, btnStyle: btnStyle, items: items }, props), index, data);
    }
    return _react2.default.createElement(
      _routerlink2.default,
      Object.assign({
        key: index,
        to: replaceTokens(link, data),
        className: 'btn btn-' + btnStyle }, props),
      replaceTokens(caption, data)
    );
  };
  var createDeleteAction = function createDeleteAction(_ref4, index, data) {
    var _ref4$caption = _ref4.caption,
        caption = _ref4$caption === undefined ? 'Delete' : _ref4$caption,
        deleteTarget = _ref4.delete,
        title = _ref4.title,
        message = _ref4.message,
        successUrl = _ref4.successUrl,
        props = _objectWithoutProperties(_ref4, ['caption', 'delete', 'title', 'message', 'successUrl']);

    return _react2.default.createElement(_Delete2.default, Object.assign({
      key: index,
      target: replaceTokens(deleteTarget, data),
      title: replaceTokens(title, data),
      message: replaceTokens(message, data),
      successUrl: replaceTokens(successUrl, data),
      caption: replaceTokens(caption, data)
    }, props));
  };
  var createComponentAction = function createComponentAction(_ref5, index, data) {
    var Component = _ref5.Component,
        props = _ref5.props;

    return _react2.default.createElement(Component, props);
  };
  var createAction = function createAction(action, row, index) {
    if (_react2.default.isValidElement(action)) {
      return _react2.default.createElement(
        'span',
        { key: index },
        action
      );
    }
    if (action.link) {
      return createLinkAction(action, index, row);
    }
    if (action.delete) {
      return createDeleteAction(action, index, row);
    }
    if (typeof action === 'function') {
      return action(row, action, index);
    }
    if (typeof action.Component === 'function') {
      return createComponentAction(action, index, row);
    }
    return action;
  };
  var actionMapper = function actionMapper(data) {
    var row = mapper ? mapper(data) : data;
    if (Array.isArray(actions)) {
      var actionElements = _react2.default.createElement(
        'span',
        null,
        actions.map(function (action, index) {
          return createAction(action, data, index);
        })
      );
      return Object.assign({}, row, { actions: actionElements });
    }
    return Object.assign({}, row, { actions: createAction(actions, data) });
  };
  if (columns) {
    var actionsIndex = columns.findIndex(function (a) {
      if (a === 'actions') {
        return true;
      }
      if (a.value === 'actions') {
        return true;
      }
      return false;
    });
    if (actionsIndex === -1) {
      columns.push('actions');
    }
  }
  return _react2.default.createElement(_table.Table, Object.assign({ mapper: actionMapper, columns: columns }, props));
};

ActionTable.propTypes = {
  items: _propTypes2.default.array,
  actions: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  mapper: _propTypes2.default.func,
  columns: _propTypes2.default.array
};

exports.ActionTable = ActionTable;