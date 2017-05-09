'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('dom-helpers/events');

var _events2 = _interopRequireDefault(_events);

var _ownerDocument = require('dom-helpers/ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _inDOM = require('dom-helpers/util/inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Modal = require('react-overlays/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _isOverflowing = require('react-overlays/lib/utils/isOverflowing');

var _isOverflowing2 = _interopRequireDefault(_isOverflowing);

var _elementType = require('react-prop-types/lib/elementType');

var _elementType2 = _interopRequireDefault(_elementType);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _ModalBody = require('./ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

var _ModalDialog = require('./ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ModalFooter = require('./ModalFooter');

var _ModalFooter2 = _interopRequireDefault(_ModalFooter);

var _ModalHeader = require('./ModalHeader');

var _ModalHeader2 = _interopRequireDefault(_ModalHeader);

var _ModalTitle = require('./ModalTitle');

var _ModalTitle2 = _interopRequireDefault(_ModalTitle);

var _bootstrapUtils = require('./utils/bootstrapUtils');

var _createChainedFunction = require('./utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _splitComponentProps3 = require('./utils/splitComponentProps');

var _splitComponentProps4 = _interopRequireDefault(_splitComponentProps3);

var _StyleConfig = require('./utils/StyleConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = Object.assign({}, _Modal2.default.propTypes, _ModalDialog2.default.propTypes, {

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: _propTypes2.default.oneOf(['static', true, false]),

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: _propTypes2.default.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: _propTypes2.default.bool,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogComponentClass: _elementType2.default,

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: _propTypes2.default.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: _propTypes2.default.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: _propTypes2.default.bool,

  /**
   * When `true` The modal will show itself.
   */
  show: _propTypes2.default.bool,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: _propTypes2.default.func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: _propTypes2.default.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: _propTypes2.default.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: _propTypes2.default.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: _propTypes2.default.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: _propTypes2.default.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: _propTypes2.default.func,

  /**
   * @private
   */
  container: _Modal2.default.propTypes.container
});

var defaultProps = Object.assign({}, _Modal2.default.defaultProps, {
  animation: true,
  dialogComponentClass: _ModalDialog2.default
});

var childContextTypes = {
  $bs_modal: _propTypes2.default.shape({
    onHide: _propTypes2.default.func
  })
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props, context) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props, context));

    _this.handleEntering = _this.handleEntering.bind(_this);
    _this.handleExited = _this.handleExited.bind(_this);
    _this.handleWindowResize = _this.handleWindowResize.bind(_this);
    _this.handleDialogClick = _this.handleDialogClick.bind(_this);

    _this.state = {
      style: {}
    };
    return _this;
  }

  _createClass(Modal, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        $bs_modal: {
          onHide: this.props.onHide
        }
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Clean up the listener if we need to.
      this.handleExited();
    }
  }, {
    key: 'handleEntering',
    value: function handleEntering() {
      // FIXME: This should work even when animation is disabled.
      _events2.default.on(window, 'resize', this.handleWindowResize);
      this.updateStyle();
    }
  }, {
    key: 'handleExited',
    value: function handleExited() {
      // FIXME: This should work even when animation is disabled.
      _events2.default.off(window, 'resize', this.handleWindowResize);
    }
  }, {
    key: 'handleWindowResize',
    value: function handleWindowResize() {
      this.updateStyle();
    }
  }, {
    key: 'handleDialogClick',
    value: function handleDialogClick(e) {
      if (e.target !== e.currentTarget) {
        return;
      }

      this.props.onHide();
    }
  }, {
    key: 'updateStyle',
    value: function updateStyle() {
      if (!_inDOM2.default) {
        return;
      }

      var dialogNode = this._modal.getDialogElement();
      var dialogHeight = dialogNode.scrollHeight;

      var document = (0, _ownerDocument2.default)(dialogNode);
      var bodyIsOverflowing = (0, _isOverflowing2.default)(_reactDom2.default.findDOMNode(this.props.container || document.body));
      var modalIsOverflowing = dialogHeight > document.documentElement.clientHeight;

      this.setState({
        style: {
          paddingRight: bodyIsOverflowing && !modalIsOverflowing ? (0, _scrollbarSize2.default)() : undefined,
          paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? (0, _scrollbarSize2.default)() : undefined
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          backdrop = _props.backdrop,
          animation = _props.animation,
          show = _props.show,
          Dialog = _props.dialogComponentClass,
          className = _props.className,
          style = _props.style,
          children = _props.children,
          onEntering = _props.onEntering,
          onExited = _props.onExited,
          props = _objectWithoutProperties(_props, ['backdrop', 'animation', 'show', 'dialogComponentClass', 'className', 'style', 'children', 'onEntering', 'onExited']);

      var _splitComponentProps = (0, _splitComponentProps4.default)(props, _Modal2.default),
          _splitComponentProps2 = _slicedToArray(_splitComponentProps, 2),
          baseModalProps = _splitComponentProps2[0],
          dialogProps = _splitComponentProps2[1];

      var inClassName = show && !animation && 'in';

      return _react2.default.createElement(
        _Modal2.default,
        Object.assign({}, baseModalProps, {
          ref: function ref(c) {
            _this2._modal = c;
          },
          show: show,
          onEntering: (0, _createChainedFunction2.default)(onEntering, this.handleEntering),
          onExited: (0, _createChainedFunction2.default)(onExited, this.handleExited),
          backdrop: backdrop,
          backdropClassName: (0, _classnames2.default)((0, _bootstrapUtils.prefix)(props, 'backdrop'), inClassName),
          containerClassName: (0, _bootstrapUtils.prefix)(props, 'open'),
          transition: animation ? _Fade2.default : undefined,
          dialogTransitionTimeout: Modal.TRANSITION_DURATION,
          backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
        }),
        _react2.default.createElement(
          Dialog,
          Object.assign({}, dialogProps, {
            style: Object.assign({}, this.state.style, style),
            className: (0, _classnames2.default)(className, inClassName),
            onClick: backdrop === true ? this.handleDialogClick : null
          }),
          children
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.childContextTypes = childContextTypes;

Modal.Body = _ModalBody2.default;
Modal.Header = _ModalHeader2.default;
Modal.Title = _ModalTitle2.default;
Modal.Footer = _ModalFooter2.default;

Modal.Dialog = _ModalDialog2.default;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

exports.default = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], Modal));