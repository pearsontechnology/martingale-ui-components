import React from 'react';
import PropTypes from 'prop-types';

/**
 * Item to be placed within a ListGroup
 * @name ListGroupItem
 * @param {object} props
 * @param {object} props.link - Link to where clicking the item should take the user
 * @param {object} props.badge - Icon or Badge to display next to the item
 * @param {array} props.children - Children to place in the item
 */
const Item = (props)=>{
  const {
    link,
    badge,
    children
  } = props;
  if (link) {
    return (
      <a href={link} className="list-group-item">
        {badge?<span className="badge">{badge}</span>:''}
        {children}
      </a>
    );
  }
  return (
    <span className="list-group-item">
      {badge?<span className="badge">{badge}</span>:''}
      {children}
    </span>
  );
};

Item.propTypes = {
  link: PropTypes.string,
  badge: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default Item;
