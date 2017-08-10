import React from 'react';

import Panel from '../Panels/Panel';
import {Table} from '../Tables/table';
import {ActionTable} from '../Tables/actiontable';
import JsonView from '../JsonView/jsonview';

import {
  betterType
} from 'martingale-utils';

const ViewContents = ({data, actions, footerContents, nowrap=false, inset = true, ...props})=>{
  const dataType = betterType(data);
  const wrap = (children, {inset})=>{
    if(nowrap){
      return (
          <div className="dataView">
            {children}
          </div>
        );
    }
    return (
      <Panel inset={inset}>
        <div className="dataView">
          {children}
          {footerContents}
        </div>
      </Panel>
    );
  };
  if(dataType === 'array'){
    const showPagination = data.length > 20;
    if(actions){
      return wrap(<ActionTable data={data} actions={actions} filterable={false} showPagination={showPagination} {...props} />, {inset: false});
    }
    return wrap(<Table data={data} filterable={false} showPagination={showPagination} {...props} />, {inset: false});
  }
  if(dataType === 'object'){
    const keys = Object.keys(data);
    const children = keys.map((key)=>{
      const value = <ViewContents data={data[key]} inset={false} nowrap={true} />;
      return [
        <dt key={key}>{key}</dt>,
        <dd key={`${key}-value`}>{value}</dd>
      ];
    });
    const objectList = <dl className={nowrap?'inset-children':''}>{children}</dl>;
    return wrap(objectList, {inset});
  }
  console.log(typeof(data), data)
  //return wrap(<JsonView json={data} inset={true} {...props} />, {inset});
  return wrap(<span className="inset">{data.toString?data.toString():`Can't convert type "${typeof(data)}"`}</span>, {inset});
};

const DataView = (props)=>{
  const {
      inset,
      data,
      footerContents
    } = props;
  if(typeof(data)==='undefined'){
    return (
        <Panel inset={true}>
          <span className="loading">Loading...</span>
        </Panel>
      );
  }
  return <ViewContents {...props} />;
};

export default DataView;
