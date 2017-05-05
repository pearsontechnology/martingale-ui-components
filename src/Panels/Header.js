import React from 'react';
import PropTypes from 'prop-types';

const PanelHeader = (props)=>{
  const {
    children
  } = props;

  return (
    <div className="panel-heading">
      {children}
    </div>
  );
};

PanelHeader.propTypes={
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default PanelHeader;
