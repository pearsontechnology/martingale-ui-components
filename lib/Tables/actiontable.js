'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTable = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./table');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../actions/actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ActionTableView = function ActionTableView(_ref) {
  var mapper = _ref.mapper,
      _ref$actions = _ref.actions,
      actions = _ref$actions === undefined ? [] : _ref$actions,
      columns = _ref.columns,
      props = _objectWithoutProperties(_ref, ['mapper', 'actions', 'columns']);

  var actionMapper = function actionMapper(data) {
    var row = mapper ? mapper(data) : data;
    return Object.assign({}, row, { actions: _react2.default.createElement(_actions2.default, { data: data, actions: actions }) });
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

ActionTableView.propTypes = {
  items: _propTypes2.default.array,
  actions: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  mapper: _propTypes2.default.func,
  columns: _propTypes2.default.array,
  suppress: _propTypes2.default.array
};

/**
 * A table with standard actions in the last column for each row
 * @param {object} props
 * @param {array} props.actions - List of actions to be displayed in the last column
 * @extends Table
 */
var ActionTable = ActionTableView;

exports.ActionTable = ActionTable;