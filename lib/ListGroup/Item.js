'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Item to be placed within a ListGroup
 * @name ListGroupItem
 * @param {object} props
 * @param {object} props.link - Link to where clicking the item should take the user
 * @param {object} props.badge - Icon or Badge to display next to the item
 * @param {array} props.children - Children to place in the item
 */
var Item = function Item(props) {
  var link = props.link,
      badge = props.badge,
      children = props.children;

  if (link) {
    return _react2.default.createElement(
      'a',
      { href: link, className: 'list-group-item' },
      badge ? _react2.default.createElement(
        'span',
        { className: 'badge' },
        badge
      ) : '',
      children
    );
  }
  return _react2.default.createElement(
    'span',
    { className: 'list-group-item' },
    badge ? _react2.default.createElement(
      'span',
      { className: 'badge' },
      badge
    ) : '',
    children
  );
};

Item.propTypes = {
  link: _propTypes2.default.string,
  badge: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.array])
};

exports.default = Item;