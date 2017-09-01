import React from 'react';

/**
 * Creates a pre element that contains JSON.stringify(props, null, 2) of the props passed to it
 * @param {object} props - JSON Serializeable object to be displayed
 */

const DebugPanel = (props)=>(
  <div>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

export default DebugPanel;
