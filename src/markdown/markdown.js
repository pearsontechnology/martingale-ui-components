import React from 'react';
import MD from 'markdown-it';
import Panel from '../Panels/Panel';
import HTML from '../html';
import hljs from 'highlight.js';
const md = MD({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

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
