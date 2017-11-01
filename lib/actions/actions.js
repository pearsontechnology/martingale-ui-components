'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _martingaleUtils = require('martingale-utils');

var _routerlink = require('../Router/routerlink');

var _routerlink2 = _interopRequireDefault(_routerlink);

var _Button = require('../Buttons/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Delete = require('../Buttons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _OptionsButton = require('../Buttons/OptionsButton');

var _OptionsButton2 = _interopRequireDefault(_OptionsButton);

var _Confirm = require('../Buttons/Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var reToken = /\${([^}]+)}/g;

var replaceTokens = function replaceTokens(source, data) {
  var type = typeof source === 'undefined' ? 'undefined' : _typeof(source);
  if (type === 'undefined') {
    return source;
  }
  if (type === 'function') {
    return source(data);
  }
  if (Array.isArray(source)) {
    return source.map(function (item) {
      return replaceTokens(item, data);
    });
  }
  if (source && type === 'object') {
    var keys = Object.keys(source);
    return keys.reduce(function (o, key) {
      var value = replaceTokens(source[key], data);
      o[key] = value;
      return o;
    }, {});
  }
  if (type === 'string') {
    return source.replace(reToken, function (full, token) {
      return (0, _martingaleUtils.getObjectValue)(token, data);
    });
  }
  return source;
};

var createDropdownList = function createDropdownList(_ref, index, data) {
  var caption = _ref.caption,
      link = _ref.link,
      _ref$items = _ref.items,
      listItems = _ref$items === undefined ? [] : _ref$items,
      btnStyle = _ref.btnStyle,
      props = _objectWithoutProperties(_ref, ['caption', 'link', 'items', 'btnStyle']);

  var linkTo = replaceTokens(link, data);
  var displayCaption = replaceTokens(caption, data);
  var items = listItems.map(function (item) {
    var link = item.link,
        caption = item.caption,
        props = _objectWithoutProperties(item, ['link', 'caption']);

    return Object.assign({
      link: replaceTokens(link, data),
      caption: replaceTokens(caption, data)
    }, props);
  });
  return _react2.default.createElement(_OptionsButton2.default, {
    key: index,
    caption: displayCaption,
    to: linkTo,
    items: items,
    btnStyle: btnStyle
  });
};

var createLinkAction = function createLinkAction(_ref2, index, data) {
  var caption = _ref2.caption,
      link = _ref2.link,
      _ref2$btnStyle = _ref2.btnStyle,
      btnStyle = _ref2$btnStyle === undefined ? 'default' : _ref2$btnStyle,
      items = _ref2.items,
      props = _objectWithoutProperties(_ref2, ['caption', 'link', 'btnStyle', 'items']);

  if (Array.isArray(items)) {
    return createDropdownList(Object.assign({ caption: caption, link: link, btnStyle: btnStyle, items: items }, props), index, data);
  }
  return _react2.default.createElement(
    _routerlink2.default,
    Object.assign({
      key: index,
      to: replaceTokens(link, data),
      className: 'btn btn-' + btnStyle }, props),
    replaceTokens(caption, data)
  );
};

var createFetchAction = function createFetchAction(rawProps, index, data) {
  var props = replaceTokens(rawProps, data);

  var caption = props.caption,
      _props$message = props.message,
      message = _props$message === undefined ? '' : _props$message,
      _props$title = props.title,
      title = _props$title === undefined ? '' : _props$title,
      _props$successUrl = props.successUrl,
      successUrl = _props$successUrl === undefined ? window.location.pathname : _props$successUrl,
      _props$fetch = props.fetch,
      options = _props$fetch === undefined ? {} : _props$fetch,
      rest = _objectWithoutProperties(props, ['caption', 'message', 'title', 'successUrl', 'fetch']);

  var urlOptions = typeof options === 'string' ? {
    method: 'post',
    url: options
  } : options;
  var complete = function complete(err) {
    if (err) {
      throw err;
    }
    return history.push(successUrl);
  };
  var fetchOptions = (0, _martingaleUtils.merge)({ method: 'post' }, urlOptions, { callback: complete });
  var clickHandler = function clickHandler(e) {
    e && e.preventDefault && e.preventDefault();
    (0, _martingaleUtils.fetch)(fetchOptions);
  };
  if (message) {
    return _react2.default.createElement(
      _Confirm2.default,
      Object.assign({ key: index, onYes: clickHandler, title: title, caption: caption }, rest),
      message
    );
  }
  return _react2.default.createElement(
    _Button2.default,
    Object.assign({ onClick: clickHandler, key: index }, rest),
    caption
  );
};

var createDeleteAction = function createDeleteAction(_ref3, index, data) {
  var _ref3$caption = _ref3.caption,
      caption = _ref3$caption === undefined ? 'Delete' : _ref3$caption,
      deleteTarget = _ref3.delete,
      title = _ref3.title,
      message = _ref3.message,
      successUrl = _ref3.successUrl,
      props = _objectWithoutProperties(_ref3, ['caption', 'delete', 'title', 'message', 'successUrl']);

  return _react2.default.createElement(_Delete2.default, Object.assign({
    key: index,
    target: replaceTokens(deleteTarget, data),
    title: replaceTokens(title, data),
    message: replaceTokens(message, data),
    successUrl: replaceTokens(successUrl, data),
    caption: replaceTokens(caption, data)
  }, props));
};

var createComponentAction = function createComponentAction(_ref4, index, data) {
  var Component = _ref4.Component,
      props = _ref4.props;

  return _react2.default.createElement(Component, props);
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
  if (action.fetch) {
    return createFetchAction(action, index, row);
  }
  if (action.delete) {
    return createDeleteAction(action, index, row);
  }
  if (typeof action === 'function') {
    return action(row, action, index);
  }
  if (typeof action.Component === 'function') {
    return createComponentAction(action, index, row);
  }
  return action;
};

var ActionsView = function (_React$Component) {
  _inherits(ActionsView, _React$Component);

  function ActionsView() {
    _classCallCheck(this, ActionsView);

    return _possibleConstructorReturn(this, (ActionsView.__proto__ || Object.getPrototypeOf(ActionsView)).apply(this, arguments));
  }

  _createClass(ActionsView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actions = _props.actions,
          data = _props.data;

      if (Array.isArray(actions)) {
        var actionElements = actions.map(function (action, index) {
          return createAction(action, data, index);
        });
        return _react2.default.createElement(
          'span',
          null,
          actionElements
        );
      }
      return createAction(action, data, index);
    }
  }]);

  return ActionsView;
}(_react2.default.Component);

;

/**
 * Provides a list of actions to be displayed
 * @param {object} props
 * @param {array} props.actions - List of actions to be displayed
 * @param {array} props.data - The data to work with
 */
var Actions = (0, _reactRouterDom.withRouter)(ActionsView);

Actions.propTypes = {
  actions: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object])
};

exports.default = Actions;