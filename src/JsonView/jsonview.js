import React from 'react';
import PropTypes from 'prop-types';

const JsonView = ({json})=>{
  return (
    <pre>
      {JSON.stringify(json, null, 2)}
    </pre>
  );
};

JsonView.propTypes = {
  json: PropTypes.any
};

export default JsonView;
