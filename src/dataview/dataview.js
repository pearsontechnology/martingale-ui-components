import React from 'react';

import Panel from '../Panels/Panel';
import {Table} from '../Tables/table';
import {ActionTable} from '../Tables/actiontable';
import JsonView from '../JsonView/jsonview';

import {
  betterType
} from 'martingale-utils';

const DataView = ({data, actions, footerContents, inset = true, ...props})=>{
  if(!data){
    return (
        <Panel inset={true}>
          <span className="loading">Loading...</span>
        </Panel>
      );
  }
  const dataType = betterType(data);
  const wrap = (children, {inset = true})=>{
    return (
        <Panel inset={inset}>
          {children}
          {footerContents}
        </Panel>
      );
  };
  if(dataType === 'array'){
    if(actions){
      return wrap(<ActionTable data={data} actions={actions} {...props} />, {inset: false});
    }
    return wrap(<Table data={data} {...props} />, {inset: false});
  }
  return wrap(<JsonView json={data} inset={true} {...props} />, {inset});
};

export default DataView;
