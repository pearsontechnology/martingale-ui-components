import React from 'react';

const render = (children, item)=>{
  const childList = Array.isArray(children)?children:[children];
  return childList.map((Child, index)=>{
    if(typeof(Child)==='function'){
      return <Child {...item} />;
    }
    return Child;
  });
};

const Listing = ({list, children})=>{
  if(!list){
    return <div />;
  }
  return <div>{list.map((item, index)=>render(children, item))}</div>;
};

export default Listing;
