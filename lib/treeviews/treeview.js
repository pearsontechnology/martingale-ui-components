'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _martingaleUtils = require('martingale-utils');

var _Panel = require('../Panels/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNodeItem = function (_React$Component) {
  _inherits(TreeNodeItem, _React$Component);

  function TreeNodeItem() {
    _classCallCheck(this, TreeNodeItem);

    return _possibleConstructorReturn(this, (TreeNodeItem.__proto__ || Object.getPrototypeOf(TreeNodeItem)).apply(this, arguments));
  }

  _createClass(TreeNodeItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          node_name = _props.node_name,
          level = _props.level,
          children = _props.children;

      return _react2.default.createElement(
        'li',
        { key: node_name || level, className: 'tree-node level-' + level },
        node_name ? node_name + ' - ' : '',
        children
      );
    }
  }]);

  return TreeNodeItem;
}(_react2.default.Component);

;

var TreeNode = function (_React$Component2) {
  _inherits(TreeNode, _React$Component2);

  function TreeNode() {
    _classCallCheck(this, TreeNode);

    return _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).apply(this, arguments));
  }

  _createClass(TreeNode, [{
    key: 'renderList',
    value: function renderList(options, nodes) {
      var node_name = options.node_name,
          level = options.level;

      if (node_name) {
        return _react2.default.createElement(
          TreeNodeItem,
          { node_name: node_name, key: node_name || level },
          _react2.default.createElement(
            'ul',
            { className: 'list-group' },
            nodes
          )
        );
      }
      return _react2.default.createElement(
        'ul',
        { key: node_name || level, className: 'list-group' },
        nodes
      );
    }
  }, {
    key: 'render_object',
    value: function render_object(options) {
      var node_name = options.node_name,
          data = options.data,
          atLevel = options.level;

      if (!data) {
        return _react2.default.createElement(TreeNodeItem, { node_name: node_name, key: node_name || level });
      }
      var level = atLevel + 1;
      var nodes = Object.keys(data).map(function (key) {
        var nodeData = data[key];
        return _react2.default.createElement(TreeNode, Object.assign({ visible: true }, options, { key: key, node_name: key, data: nodeData, level: level }));
      });
      return this.renderList(options, nodes);
    }
  }, {
    key: 'render_array',
    value: function render_array(option) {
      var _options = options,
          node_name = _options.node_name,
          data = _options.data,
          atLevel = _options.level;

      if (!data) {
        return _react2.default.createElement(TreeNodeItem, { node_name: node_name, key: node_name || level });
      }
      var level = atLevel + 1;
      var nodes = data.map(function (key) {
        var nodeData = data[key];
        return _react2.default.createElement(TreeNode, Object.assign({ visible: true }, options, { key: key, node_name: key, data: nodeData, level: level }));
      });
      return this.renderList(options, nodes);
    }
  }, {
    key: 'render_default',
    value: function render_default(_ref) {
      var node_name = _ref.node_name,
          data = _ref.data,
          editable = _ref.editable;

      return _react2.default.createElement(
        TreeNodeItem,
        { node_name: node_name, key: node_name || level },
        data
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data;

      var type = (0, _martingaleUtils.betterType)(data);
      var f = (this['render_' + type] || this.render_default).bind(this);
      return f(this.props);
    }
  }]);

  return TreeNode;
}(_react2.default.Component);

;

var TreeView = function (_React$Component3) {
  _inherits(TreeView, _React$Component3);

  function TreeView() {
    _classCallCheck(this, TreeView);

    return _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).apply(this, arguments));
  }

  _createClass(TreeView, [{
    key: 'renderTreeview',
    value: function renderTreeview() {
      var _props2 = this.props,
          data = _props2.data,
          options = _objectWithoutProperties(_props2, ['data']);

      return _react2.default.createElement(
        _Panel2.default,
        { inset: true },
        _react2.default.createElement(
          'div',
          { className: 'treeview' },
          _react2.default.createElement(TreeNode, Object.assign({ level: 1, data: data, visible: true }, options))
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderTreeview();
    }
  }]);

  return TreeView;
}(_react2.default.Component);

;

exports.default = TreeView;