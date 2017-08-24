import React from 'react';

const createMarkup = (children)=>({__html: children});

const DisplayHtml = ({children})=>(
  <div className="embedded-html" dangerouslySetInnerHTML={createMarkup(children)}/>
);

export default DisplayHtml;
