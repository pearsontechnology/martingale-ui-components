import React from 'react';
import PropTypes from 'prop-types';

const PanelHeader = (props)=>{
  const {
    title,
    children
  } = props;
  const contents=title?title:children;

  return (
    <h3 className="panel-title">{contents}</h3>
  );
};

PanelHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ])
};

export default PanelHeader;
