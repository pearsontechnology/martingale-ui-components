'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dialog = function (_React$Component) {
  _inherits(Dialog, _React$Component);

  function Dialog(_ref) {
    var _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible;

    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

    _this.state = { visible: visible };
    return _this;
  }

  _createClass(Dialog, [{
    key: 'show',
    value: function show() {
      this.setState({ visible: true });
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({ visible: false });
    }
  }, {
    key: 'cancelClick',
    value: function cancelClick(e) {
      e && e.preventDefault();
      if (this.props.onCancel) {
        return this.props.onCancel(this);
      }
      this.hide();
    }
  }, {
    key: 'actionHandler',
    value: function actionHandler(e, action) {
      e.preventDefault();
      if (typeof action === 'function') {
        return action(this);
      }
      if (action && action.handler) {
        return action.handler(this);
      }
      return this.hide();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var visible = newProps.visible;

      if (typeof visible === 'boolean') {
        this.setState({ visible: visible });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          message = _props.message,
          children = _props.children,
          _props$actions = _props.actions,
          actions = _props$actions === undefined ? {} : _props$actions;
      var _state$visible = this.state.visible,
          visible = _state$visible === undefined ? true : _state$visible;

      var content = message || children;

      var actionButtons = Object.keys(actions).map(function (actionName) {
        var action = actions[actionName];
        return _react2.default.createElement(
          'button',
          { key: actionName, onClick: function onClick(e) {
              return _this2.actionHandler(e, action);
            }, className: 'btn btn-' + (action.btnStyle || 'primary') },
          actionName
        );
      });

      return _react2.default.createElement(
        _reactBootstrap.Modal,
        { show: visible, onHide: this.cancelClick.bind(this) },
        _react2.default.createElement(
          _reactBootstrap.Modal.Header,
          { closeButton: true },
          _react2.default.createElement(
            _reactBootstrap.Modal.Title,
            null,
            title
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Body,
          null,
          content
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Footer,
          null,
          actionButtons
        )
      );
    }
  }]);

  return Dialog;
}(_react2.default.Component);

;

Dialog.propTypes = {
  visible: _propTypes2.default.bool,
  onCancel: _propTypes2.default.func,
  title: _propTypes2.default.string,
  message: _propTypes2.default.string,
  actions: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = Dialog;