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
        return _react2.default.createElement(
          'pre',
          null,
          JSON.stringify(from, null, 2)
        );
      }
      return from;
    }
  }, {
    key: 'getTableSettings',
    value: function getTableSettings(rawData) {
      var _this2 = this;

      var columns = this.props.columns;
      var data = rawData.map(function (d) {
        if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object') {
          if (!(d instanceof Date) && !(d instanceof RegExp)) {
            return d;
          }
        }
        return {
          value: d
        };
      });
      var headers = columns ? columns.map(function (c) {
        if (typeof c === 'string') {
          return {
            key: c,
            caption: makeCaption(c)
          };
        }
        return {
          key: c.value,
          caption: c.caption || makeCaption(c.value)
        };
      }) : data.reduce(function (headers, rec) {
        if ((typeof rec === 'undefined' ? 'undefined' : _typeof(rec)) !== 'object') {
          return headers;
        }
        return Object.keys(rec).reduce(function (headers, header) {
          if (headers.findIndex(function (h) {
            return h.key === header;
          }) > -1) {
            return headers;
          }
          return headers.concat({
            key: header,
            caption: makeCaption(header)
          });
        }, headers);
      }, []);
      var trHeaders = headers.map(function (header) {
        return _react2.default.createElement(
          'th',
          { key: header.key },
          header.caption
        );
      });
      var tbody = data.map(function (item, rowIndex) {
        var fields = headers.map(function (field, index) {
          return _react2.default.createElement(
            'td',
            { key: index },
            field.key === '#' ? rowIndex + 1 : typeof item[field.key] !== 'undefined' ? _this2.getDisplayValue(item[field.key], item) : ''
          );
        });
        return _react2.default.createElement(
          'tr',
          { key: rowIndex },
          fields
        );
      });
      return {
        trHeaders: trHeaders,
        tbody: tbody
      };
    }
  }, {
    key: 'getTable_old',
    value: function getTable_old() {
      var data = this.getData();
      if (!data || !data.length) {
        return _react2.default.createElement('div', null);
      }

      var _getTableSettings = this.getTableSettings(Array.isArray(data) ? data : []),
          trHeaders = _getTableSettings.trHeaders,
          tbody = _getTableSettings.tbody;

      return _react2.default.createElement(
        _reactBootstrap.Table,
        { striped: true, bordered: true, condensed: true, hover: true },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            trHeaders
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          tbody
        )
      );
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
      var _this3 = this;

      var getDisplayValue = this.getDisplayValue.bind(this);
      var rawData = this.getData();
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
          Cell: function Cell(_ref2) {
            var data = _ref2.original;

            return getDisplayValue(data[c.value], data);
          },

          Header: c.caption || makeCaption(c.value)
        };
      }) : rawData.reduce(function (headers, rec) {
        return Object.keys(rec).reduce(function (headers, header) {
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
        return row[id] !== undefined ? _this3.getFilterValue(row[id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1 : true;
      };
      return _react2.default.createElement(_reactTable2.default, {
        minRows: 0,
        filterable: true,
        data: data,
        columns: columns,
        defaultFilterMethod: defaultFilterMethod
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
  columns: _propTypes2.default.array
};
;

exports.Table = Table;