'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTable = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./table');

var _Router = require('../Router');

var _martingaleUtils = require('martingale-utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var reToken = /\${([^}]+)}/g;
var ActionTable = function ActionTable(_ref) {
  var mapper = _ref.mapper,
      actions = _ref.actions,
      props = _objectWithoutProperties(_ref, ['mapper', 'actions']);

  var replaceTokens = function replaceTokens(source, data) {
    return source.replace(reToken, function (full, token) {
      return (0, _martingaleUtils.getObjectValue)(token, data);
    });
  };
  var createLinkAction = function createLinkAction(_ref2, index, data) {
    var caption = _ref2.caption,
        link = _ref2.link,
        _ref2$btnStyle = _ref2.btnStyle,
        btnStyle = _ref2$btnStyle === undefined ? 'default' : _ref2$btnStyle,
        props = _objectWithoutProperties(_ref2, ['caption', 'link', 'btnStyle']);

    return _react2.default.createElement(
      _Router.Link,
      Object.assign({ key: index, to: replaceTokens(link, data), className: 'btn btn-' + btnStyle }, props),
      caption
    );
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
    if (typeof action === 'function') {
      return action(row, action, index);
    }
    return action;
  };
  var actionMapper = function actionMapper(data) {
    var row = mapper ? mapper(data) : data;
    if (Array.isArray(actions)) {
      return Object.assign({}, row, { actions: _react2.default.createElement(
          'span',
          null,
          actions.map(function (action, index) {
            return createAction(action, row, index);
          })
        ) });
    }
    return Object.assign({}, row, { actions: createAction(actions, row) });
  };
  return _react2.default.createElement(_table.Table, Object.assign({ mapper: actionMapper }, props));
};

ActionTable.propTypes = {
  items: _propTypes2.default.array,
  actions: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  mapper: _propTypes2.default.func
};

exports.ActionTable = ActionTable;