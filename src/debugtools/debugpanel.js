import React from 'react';

const DebugPanel = (props)=>(
  <div>
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

export default DebugPanel;
