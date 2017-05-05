import React from 'react';
import PropTypes from 'prop-types';

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
