import React from 'react';
import MD from 'markdown-it';
import Panel from '../Panels/Panel';
import HTML from '../html';
const md = MD();

/**
 * Renders MarkDown directly
 * @name MarkDown
 * @param {object} props
 * @param {string} props.children - Markdown to be displayed
 */

const MarkDown = ({children: src})=>{
  const html = md.render(src);
  return <Panel inset={true}><HTML>{html}</HTML></Panel>;
};

export default MarkDown;
