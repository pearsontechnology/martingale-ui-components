import React from 'react';

import Panel from '../Panels/Panel';
import {Table} from '../Tables/table';
import {ActionTable} from '../Tables/actiontable';
import JsonView from '../JsonView/jsonview';
import YamlView from '../YamlView/yamlview';
import {Tabs} from '../tabs/tabs';
import Error from '../error/error';

import Actions from '../actions/actions';

import {
  betterType
} from '@martingale/utils';

const toString = (data)=>{
  const type = betterType(data);
  if(type === 'null'){
    return 'null';
  }
  if(type === 'undefined'){
    return 'undefined';
  }
  return data.toString?data.toString():`Can't convert type "${typeof(data)}"`;
};

const getDefaultKey = (columns = [], defaultValue = '')=>{
  if(!columns || columns.length===0){
    return defaultValue;
  }
  const first = columns[0];
  if(typeof(first)==='string'){
    return first;
  }
  if(first.caption){
    return first.caption;
  }
  return defaultValue;
};

const ViewContents = ({data, viewOptions = true, actions, footerContents, footerActions, nowrap=false, inset = true, __level=0, ...props})=>{
  const footer = footerContents?footerContents:(footerActions?<Actions actions={footerActions} />:'');
  const dataType = betterType(data);
  const wrap = (children, {inset})=>{
    if(nowrap){
      return (
          <div className={'dataView level-'+__level}>
            {children}
          </div>
        );
    }
    if(!viewOptions){
      return (
        <Panel inset={inset}>
          {children}
          {footer}
        </Panel>
      );
    }
    const tabs = [
      {
        title: 'Default',
        children
      },
      {
        title: 'JSON',
        children: <JsonView data={data} />
      },
      {
        title: 'YAML',
        children: <YamlView data={data} />
      }
    ];
    return (
      <Tabs inset={inset} tabs={tabs} inset={false} footer={footer} />
    );
  };
  if(dataType === 'array'){
    const showPagination = data.length > 20;
    const key = getDefaultKey(props.columns);
    data = data.map((item)=>{
      if(typeof(item)==='string'){
        return {[key]: item};
      }
      return item;
    });
    if(actions){
      return wrap(<ActionTable data={data} actions={actions} filterable={showPagination} showPagination={showPagination} {...props} />, {inset: false});
    }
    return wrap(<Table data={data} filterable={showPagination} showPagination={showPagination} {...props} />, {inset: false});
  }
  if(dataType === 'object'){
    const keys = Object.keys(data);
    const children = keys.map((key)=>{
      const value = <ViewContents data={data[key]} inset={false} nowrap={true} __level={__level+1} />;
      return [
        <dt key={key} className={'level-'+__level}>{key}</dt>,
        <dd key={`${key}-value`} className={'level-'+__level}>{value}</dd>
      ];
    });
    const objectList = <dl className={nowrap?'inset-children level-'+__level:'level-'+__level}>{children}</dl>;
    return wrap(objectList, {inset});
  }
  return wrap(<span className={'inset level-'+__level}>{toString(data)}</span>, {inset});
};

/**
 * Creates an appropriate view of the passed in data, for Arrays will display a table, for Objects will display a hybrid display.
 * @param {object} props
 * @param {boolean} props.inset - Should the content be inset
 * @param {any} props.data - Data to be displayed on the screen
 * @param {any} props.footerContents - Any contents that should be placed in the footer of the view
 * @param {any} props.footerActions - Actions that should be placed in the footer of the view
 * @param {Component} props.View - Force the view by supplying the type
 */
const DataView = (props)=>{
  const {
      inset,
      data,
      footerContents,
      footerActions,
      View
    } = props;
  if(typeof(data)==='undefined'){
    return (
        <Panel inset={true}>
          <span className="loading">Loading...</span>
        </Panel>
      );
  }
  if(data.statusCode && data.error && data.message){
    return <Error error={data} />;
  }
  if(View){
    return <View {...props} />;
  }
  return <ViewContents {...props} />;
};

export default DataView;
