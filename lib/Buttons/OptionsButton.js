'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuItem = require('../Menus/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _routerlink = require('../Router/routerlink');

var _routerlink2 = _interopRequireDefault(_routerlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptionsButtonMenu = function (_React$Component) {
  _inherits(OptionsButtonMenu, _React$Component);

  function OptionsButtonMenu() {
    _classCallCheck(this, OptionsButtonMenu);

    return _possibleConstructorReturn(this, (OptionsButtonMenu.__proto__ || Object.getPrototypeOf(OptionsButtonMenu)).apply(this, arguments));
  }

  _createClass(OptionsButtonMenu, [{
    key: 'handleClick',
    value: function handleClick(e) {
      this.props.onClick && this.props.onClick(e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$items = this.props.items,
          items = _props$items === undefined ? [] : _props$items;

      var menuItems = items.map(function (item, index) {
        return item.divider ? _react2.default.createElement(_MenuItem2.default, { key: index, divider: true }) : _react2.default.createElement(
          'li',
          { key: index, role: 'presentation' },
          _react2.default.createElement(
            _routerlink2.default,
            { to: item.link, role: 'menuitem', tabIndex: '-1', onClick: _this2.handleClick.bind(_this2) },
            item.caption
          )
        );
      });
      return _react2.default.createElement(
        'ul',
        { role: 'menu', className: 'dropdown-menu' },
        menuItems
      );
    }
  }]);

  return OptionsButtonMenu;
}(_react2.default.Component);

;

var OptionsButton = function (_React$Component2) {
  _inherits(OptionsButton, _React$Component2);

  function OptionsButton(_ref) {
    var _ref$expanded = _ref.expanded,
        expanded = _ref$expanded === undefined ? false : _ref$expanded;

    _classCallCheck(this, OptionsButton);

    var _this3 = _possibleConstructorReturn(this, (OptionsButton.__proto__ || Object.getPrototypeOf(OptionsButton)).call(this));

    _this3.state = { expanded: expanded };
    return _this3;
  }

  _createClass(OptionsButton, [{
    key: 'showDropdown',
    value: function showDropdown() {
      this.setState({ expanded: true });
    }
  }, {
    key: 'hideDropdown',
    value: function hideDropdown() {
      this.setState({ expanded: false });
    }
  }, {
    key: 'toggleDropdown',
    value: function toggleDropdown() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: 'toggleDropdownClick',
    value: function toggleDropdownClick(e) {
      e.preventDefault();
      this.toggleDropdown();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          items = _props.items,
          linkTo = _props.to,
          _props$btnStyle = _props.btnStyle,
          btnStyle = _props$btnStyle === undefined ? 'default' : _props$btnStyle;

      var open = this.state.expanded ? 'open' : '';
      return _react2.default.createElement(
        'div',
        { className: 'dropdown ' + open + ' btn-group btn-group-' + btnStyle },
        _react2.default.createElement(_routerlink2.default, { to: linkTo, caption: caption, className: 'btn btn-' + btnStyle }),
        _react2.default.createElement(
          'button',
          { className: 'dropdown-toggle btn btn-' + btnStyle, onClick: this.toggleDropdownClick.bind(this) },
          _react2.default.createElement('span', { className: 'caret' })
        ),
        _react2.default.createElement(OptionsButtonMenu, { items: items, onClick: this.hideDropdown.bind(this) })
      );
    }
  }]);

  return OptionsButton;
}(_react2.default.Component);

;

exports.default = OptionsButton;