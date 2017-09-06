'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _martingaleUtils = require('martingale-utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import 'react-table/react-table.css';

var upperFirst = function upperFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// TODO: Replace with https://github.com/tannerlinsley/react-table

var SPECIAL_CASE = ['ID', 'HTTP', 'HTTPS', 'URI', 'URL', 'API', { key: 'URIS', value: 'URI\'s' }, { key: 'URLS', value: 'URL\'s' }];
var upperIt = function upperIt(s) {
  var su = s.toUpperCase();
  return SPECIAL_CASE.reduce(function (res, map) {
    if (map === su) {
      return map;
    }
    if (map.key === su) {
      return map.value;
    }
    return res;
  }, upperFirst(s)).replace(/([a-z])([A-Z])/g, function (match, first, second) {
    return first + ' ' + second;
  }).replace(/([a-z])_([a-z])/gi, function (match, first, second) {
    return first + ' ' + second;
  });
};

var makeCaption = function makeCaption(src) {
  return src.replace(/_/g, ' ').replace(/[ \t]+/, ' ').trim().split(' ').map(upperIt).join(' ');
};

/**
 * Displays a table on the screen from the provided items.  Calculates the columns based on the passed in items keys.
 * @param {object} props
 * @param {array} props.items - The items to be displayed within the table
 * @param {array} props.columns - If specified then show only the columns listed
 * @param {array} props.suppress - Field names to not display within the table
 * @param {boolean} props.filterable - If true the allow contents to be filtered by column
 * @param {boolean} props.showPagination - Show the pagination controls
 * @param {boolean} props.showPaginationTop - If showPagination is true show the top pagination controls
 * @param {boolean} props.showPaginationBottom - If showPagination is true show the bottom pagination controls
 */

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = { data: props.data };
    return _this;
  }

  _createClass(Table, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.data && !(0, _martingaleUtils.isTheSame)(this.state.data, newProps.data)) {
        this.setState({ data: newProps.data });
      }
    }
  }, {
    key: 'getData',
    value: function getData() {
      var raw = this.state.data;

      if (!raw) {
        return [];
      }
      var data = this.props.mapRoot ? raw[this.props.mapRoot] : raw;
      if (!data) {
        return [];
      }
      if (typeof this.props.mapper === 'function') {
        if (Array.isArray(data)) {
          return data.map(this.props.mapper);
        }
        var mappedData = this.props.mapper(data);
        if (!mappedData) {
          return [];
        }
        return mappedData;
      }
      return Array.isArray(data) ? data : [];
    }
  }, {
    key: 'getDisplayValue',
    value: function getDisplayValue(from, data) {
      var type = typeof from === 'undefined' ? 'undefined' : _typeof(from);
      if (type === 'string') {
        return _react2.default.createElement(
          'div',
          { className: 'hide-overflow' },
          from
        );
      }
      if (type === 'number') {
        return from;
      }
      if (type === 'boolean') {
        return from ? 'True' : 'False';
      }
      if (type === 'object') {
        if (from instanceof Date) {
          return from.toISOString();
        }
        if (_react2.default.isValidElement(from)) {
          return from;
        }
      }
      if (type === 'function') {
        return from(data);
      }
      if (typeof from !== 'undefined') {
        //return <pre>{JSON.stringify(from, null, 2)}</pre>;
        return _react2.default.createElement(
          'pre',
          null,
          _jsYaml2.default.safeDump(from, { indent: 2 })
        );
      }
      return from;
    }
  }, {
    key: 'getFilterValue',
    value: function getFilterValue(from) {
      var type = typeof from === 'undefined' ? 'undefined' : _typeof(from);
      if (type === 'string') {
        return from;
      }
      if (type === 'number') {
        return String(from);
      }
      if (type === 'boolean') {
        return from ? 'True' : 'False';
      }
      if (type === 'object') {
        if (from instanceof Date) {
          return from.toISOString();
        }
        if (_react2.default.isValidElement(from)) {
          return String(from);
        }
      }
      if (type === 'function') {
        return from(data);
      }
      return JSON.stringify(from, null, 2);
    }
  }, {
    key: 'getTable',
    value: function getTable() {
      var _this2 = this;

      var getDisplayValue = this.getDisplayValue.bind(this);
      var rawData = this.getData();
      var suppress = Array.isArray(this.props.suppress) ? this.props.suppress : [];
      var columns = this.props.columns ? this.props.columns.map(function (c) {
        if (typeof c === 'string') {
          return {
            key: c,
            accessor: c,
            Cell: function Cell(_ref) {
              var data = _ref.original;

              return getDisplayValue(data[c], data);
            },

            Header: makeCaption(c)
          };
        }
        return {
          key: c.value,
          accessor: c.value,
          width: c.width,
          Cell: function Cell(_ref2) {
            var data = _ref2.original;

            return getDisplayValue(data[c.value], data);
          },

          Header: typeof c.caption === 'undefined' ? makeCaption(c.value) : c.caption
        };
      }) : rawData.reduce(function (headers, rec) {
        return Object.keys(rec).reduce(function (headers, header) {
          if (suppress.indexOf(header) > -1) {
            return headers;
          }
          if (headers.findIndex(function (h) {
            return h.key === header;
          }) > -1) {
            return headers;
          }
          return headers.concat({
            key: header,
            accessor: header,
            Cell: function Cell(_ref3) {
              var data = _ref3.original;

              return getDisplayValue(data[header], data);
            },

            Header: makeCaption(header)
          });
        }, headers);
      }, []);
      var data = rawData;
      var defaultFilterMethod = function defaultFilterMethod(filter, row, column) {
        var id = filter.pivotId || filter.id;
        return row[id] !== undefined ? _this2.getFilterValue(row[id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1 : true;
      };
      var _props = this.props,
          _props$filterable = _props.filterable,
          filterable = _props$filterable === undefined ? true : _props$filterable,
          _props$showPagination = _props.showPagination,
          showPagination = _props$showPagination === undefined ? true : _props$showPagination,
          _props$showPagination2 = _props.showPaginationBottom,
          showPaginationBottom = _props$showPagination2 === undefined ? true : _props$showPagination2,
          _props$showPagination3 = _props.showPaginationTop,
          showPaginationTop = _props$showPagination3 === undefined ? false : _props$showPagination3;

      return _react2.default.createElement(_reactTable2.default, {
        className: '-striped -highlight',
        minRows: 0,
        filterable: filterable,
        data: data,
        columns: columns,
        defaultFilterMethod: defaultFilterMethod,
        showPagination: showPagination,
        showPaginationTop: showPaginationTop,
        showPaginationBottom: showPaginationBottom
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.getTable();
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  items: _propTypes2.default.array,
  columns: _propTypes2.default.array,
  suppress: _propTypes2.default.array,
  filterable: _propTypes2.default.bool,
  showPagination: _propTypes2.default.bool,
  showPaginationBottom: _propTypes2.default.bool,
  showPaginationTop: _propTypes2.default.bool
};
;

exports.Table = Table;