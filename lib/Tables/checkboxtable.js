'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _selectTable = require('react-table/lib/hoc/selectTable');

var _selectTable2 = _interopRequireDefault(_selectTable);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _actions = require('../actions/actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxTableHOC = (0, _selectTable2.default)(_reactTable2.default);

// More info at: https://react-table.js.org/#/story/select-table-hoc

var CheckboxTable = function (_Component) {
  _inherits(CheckboxTable, _Component);

  function CheckboxTable(props) {
    _classCallCheck(this, CheckboxTable);

    var _this = _possibleConstructorReturn(this, (CheckboxTable.__proto__ || Object.getPrototypeOf(CheckboxTable)).call(this));

    _this.ensureKeyField = function (data) {
      var keyField = _this.keyField;
      if (!Array.isArray(data)) {
        return data;
      }
      var rows = data.map(function (item) {
        if (typeof item[keyField] === 'undefined') {
          var id = _uuid2.default.v4();
          _this.indexMap[id] = item;
          return Object.assign({}, item, _defineProperty({}, keyField, id));
        }
        _this.indexMap[item[keyField]] = item;
        return item;
      });
      return rows;
    };

    _this.toggleSelection = function (key, shift, row) {
      /*
        Implementation of how to manage the selection state is up to the developer.
        This implementation uses an array stored in the component state.
        Other implementations could use object keys, a Javascript Set, or Redux... etc.
      */
      // start off with the existing state
      var selection = [].concat(_toConsumableArray(_this.state.selection));
      var keyIndex = selection.indexOf(key);
      // check to see if the key exists
      if (keyIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [].concat(_toConsumableArray(selection.slice(0, keyIndex)), _toConsumableArray(selection.slice(keyIndex + 1)));
      } else {
        // it does not exist so add it
        selection.push(key);
      }
      // update the state
      _this.setState({ selection: selection });
    };

    _this.toggleAll = function () {
      /*
        'toggleAll' is a tricky concept with any filterable table
        do you just select ALL the records that are in your data?
        OR
        do you only select ALL the records that are in the current filtered data?
         The latter makes more sense because 'selection' is a visual thing for the user.
        This is especially true if you are going to implement a set of external functions
        that act on the selected information (you would not want to DELETE the wrong thing!).
         So, to that end, access to the internals of ReactTable are required to get what is
        currently visible in the table (either on the current page or any other page).
         The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
        ReactTable and then get the internal state and the 'sortedData'.
        That can then be iterrated to get all the currently visible records and set
        the selection state.
      */
      var selectAll = _this.state.selectAll ? false : true;
      var selection = [];
      if (selectAll) {
        // we need to get at the internals of ReactTable
        var wrappedInstance = _this.checkboxTable.getWrappedInstance();
        // the 'sortedData' property contains the currently accessible records based on the filter and sort
        var currentRecords = wrappedInstance.getResolvedState().sortedData;
        // we just push all the IDs onto the selection array
        currentRecords.forEach(function (item) {
          //selection.push(item._original._id);
          selection.push(item._original[_this.keyField]);
        });
      }
      _this.setState({ selectAll: selectAll, selection: selection });
    };

    _this.isSelected = function (key) {
      /*
        Instead of passing our external selection state we provide an 'isSelected'
        callback and detect the selection state ourselves. This allows any implementation
        for selection (either an array, object keys, or even a Javascript Set object).
      */
      return _this.state.selection.includes(key);
    };

    _this.selected = function () {
      return _this.state.selection.map(function (key) {
        return _this.indexMap[key];
      });
    };

    _this.keyField = props.keyField || '_id';
    _this.indexMap = {};
    _this.state = {
      data: _this.ensureKeyField(props.data),
      selection: [],
      selectAll: false
    };
    return _this;
  }

  _createClass(CheckboxTable, [{
    key: 'renderTable',
    value: function renderTable() {
      var _this2 = this;

      var _props = this.props,
          _ignoreKeyField = _props.keyField,
          _ignoreData = _props.data,
          props = _objectWithoutProperties(_props, ['keyField', 'data']);

      var toggleSelection = this.toggleSelection,
          toggleAll = this.toggleAll,
          isSelected = this.isSelected,
          logSelection = this.logSelection,
          keyField = this.keyField;
      var _state = this.state,
          selectAll = _state.selectAll,
          data = _state.data;

      /*
        keyField: '_id',
        isSelected: (key)=>{ console.log('No isSelected handler provided:',{key})},
        selectAll: false,
        toggleSelection: (key, shift, row)=>{ console.log('No toggleSelection handler provided:', { key, shift, row }) },
        toggleAll: () => { console.log('No toggleAll handler provided.') },
        selectType: 'check',
        SelectInputComponent: defaultSelectInputComponent,
        SelectAllInputComponent: defaultSelectInputComponent,
      */

      var checkboxProps = {
        selectAll: selectAll,
        isSelected: isSelected,
        toggleSelection: toggleSelection,
        toggleAll: toggleAll,
        selectType: 'checkbox',
        keyField: keyField
      };
      return _react2.default.createElement(CheckboxTableHOC, Object.assign({
        ref: function ref(r) {
          return _this2.checkboxTable = r;
        },
        data: data
      }, props, checkboxProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var tableActions = this.props.tableActions;
      var table = this.renderTable();
      if (!tableActions) {
        return table;
      }
      var tableActionsData = { selected: this.selected(), data: this.props.data };
      return _react2.default.createElement(
        'div',
        null,
        table,
        _react2.default.createElement(_actions2.default, Object.assign({}, this.props, { data: tableActionsData, actions: tableActions }))
      );
    }
  }]);

  return CheckboxTable;
}(_react.Component);

module.exports = { CheckboxTable: CheckboxTable };