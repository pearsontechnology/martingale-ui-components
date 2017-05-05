import React from 'react';
import PropTypes from 'prop-types';

const ContainerFluid = ({children})=>(
  <div className="container-fluid">
    {children}
  </div>
);

ContainerFluid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.array
  ])
};

export default ContainerFluid;
