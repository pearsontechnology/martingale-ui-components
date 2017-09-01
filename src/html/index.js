import React from 'react';

const createMarkup = (children)=>({__html: children});

/**
 * Renders HTML directly
 * @name HTML
 * @param {object} props
 * @param {string} props.children - HTML to be displayed
 */

const DisplayHtml = ({children})=>(
  <div className="embedded-html" dangerouslySetInnerHTML={createMarkup(children)}/>
);

export default DisplayHtml;
