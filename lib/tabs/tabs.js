'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _Panel = require('../Panels/Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(_ref) {
    var _ref$selected = _ref.selected,
        selected = _ref$selected === undefined ? 0 : _ref$selected;

    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

    _this.state = { selected: selected };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'handleSelect',
    value: function handleSelect(selected) {
      this.setState({ selected: selected });
    }
  }, {
    key: 'renderTabs',
    value: function renderTabs() {
      var selected = this.state.selected;
      var _props$tabs = this.props.tabs,
          tabsList = _props$tabs === undefined ? [] : _props$tabs;

      var tabs = tabsList.map(function (_ref2, index) {
        var title = _ref2.title;
        return _react2.default.createElement(
          _reactBootstrap.NavItem,
          { key: index, eventKey: index, title: title },
          title
        );
      });
      var visibleTab = tabsList[selected].children;
      return _react2.default.createElement(
        _Panel2.default,
        null,
        _react2.default.createElement(
          _reactBootstrap.Nav,
          { bsStyle: 'tabs', activeKey: selected, onSelect: this.handleSelect.bind(this) },
          tabs
        ),
        visibleTab
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderTabs();
    }
  }]);

  return Tabs;
}(_react2.default.Component);

Tabs.propTypes = {
  tabs: _propTypes2.default.array,
  selected: _propTypes2.default.number
};
;

exports.Tabs = Tabs;