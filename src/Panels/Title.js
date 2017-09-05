import React from 'react';
import PropTypes from 'prop-types';

/**
 * A panel for displaying a title within a panel
 * @param {object} props
 * @param {string} props.title - The title
 * @param {object} props.children - Children to be placed within the title
 */

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
