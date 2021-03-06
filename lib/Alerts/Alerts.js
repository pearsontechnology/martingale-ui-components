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

var DismissableAlert = function (_React$Component) {
  _inherits(DismissableAlert, _React$Component);

  function DismissableAlert() {
    _classCallCheck(this, DismissableAlert);

    var _this = _possibleConstructorReturn(this, (DismissableAlert.__proto__ || Object.getPrototypeOf(DismissableAlert)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(DismissableAlert, [{
    key: 'dismiss',
    value: function dismiss(e) {
      e && e.preventDefault();
      return this.hide();
    }
  }, {
    key: 'show',
    value: function show() {
      return this.setState({ dismissed: false });
    }
  }, {
    key: 'hide',
    value: function hide() {
      return this.setState({ dismissed: true });
    }
  }, {
    key: 'renderAlert',
    value: function renderAlert(options) {
      var _props = this.props,
          _props$type = _props.type,
          type = _props$type === undefined ? 'info' : _props$type,
          children = _props.children;
      var dismissed = this.state.dismissed;

      var showHideClass = dismissed ? 'hidden' : 'visible';
      return _react2.default.createElement(
        _reactBootstrap.Alert,
        { className: showHideClass, bsStyle: type, onDismiss: this.dismiss.bind(this) },
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderAlert(this.props);
    }
  }]);

  return DismissableAlert;
}(_react2.default.Component);

;

var BasicAlert = function BasicAlert(_ref) {
  var type = _ref.type,
      children = _ref.children;
  return _react2.default.createElement(
    _reactBootstrap.Alert,
    { bsStyle: type },
    children
  );
};

var DismissAfter = function DismissAfter(Wrap) {
  return function (_React$Component2) {
    _inherits(Dismissable, _React$Component2);

    function Dismissable() {
      _classCallCheck(this, Dismissable);

      var _this2 = _possibleConstructorReturn(this, (Dismissable.__proto__ || Object.getPrototypeOf(Dismissable)).call(this));

      _this2.state = {};
      return _this2;
    }

    _createClass(Dismissable, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this3 = this;

        if (this.props.dismissAfter) {
          this.setState({ timer: setTimeout(function () {
              return _this3.dismiss();
            }, this.props.dismissAfter) });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._clearTimeout();
      }
    }, {
      key: '_clearTimeout',
      value: function _clearTimeout() {
        var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

        if (this.state.timer) {
          clearTimeout(this.state.timer);
          this.setState({ timer: false });
        }
        return cb();
      }
    }, {
      key: 'dismiss',
      value: function dismiss() {
        var _this4 = this;

        this._clearTimeout(function () {
          return _this4.dismissable.dismiss();
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var props = this.props;
        return _react2.default.createElement(Wrap, Object.assign({ ref: function ref(dismissable) {
            return _this5.dismissable = dismissable;
          } }, props));
      }
    }]);

    return Dismissable;
  }(_react2.default.Component);
};

/**
 * Displays an alert box with optional dismiss button and/or self dismissing
 * @name Alert
 * @param {object} props
 * @param {string} props.bsClass - Bootstrap Classname
 * @param {array} props.children - Array of components to put inside the alert
 * @param {string} props.closeLabel - Text to place in the close button
 * @param {number} props.dismissAfter - Dismiss the alert after x milliseconds has elapsed
 * @param {boolean} props.dismissable - If true the place a close button on the alert and allow user to dismiss the alert
 * @param {function} props.onDismiss - Callback when the alert is dismissed
 * @param {('info'|'success'|'warning'|'danger')} props.type - Type of alert to be shown
 */

var AlertWrapper = function AlertWrapper(props) {
  var _props$dismissable = props.dismissable,
      dismissable = _props$dismissable === undefined ? false : _props$dismissable,
      dismissAfter = props.dismissAfter;

  if (typeof dismissAfter !== 'undefined') {
    return _react2.default.createElement(DismissAfter(DismissableAlert), props);
  }
  var AlertType = dismissable ? DismissableAlert : BasicAlert;
  return _react2.default.createElement(AlertType, props);
};

AlertWrapper.propTypes = Object.assign({}, _reactBootstrap.Alert.propTypes, {
  bsStyle: _propTypes2.default.string,
  dismissable: _propTypes2.default.bool,
  dismissAfter: _propTypes2.default.number,
  type: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
});

exports.default = AlertWrapper;