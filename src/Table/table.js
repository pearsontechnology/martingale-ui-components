import React, { Component } from 'react';
import {Table as BSTable} from 'react-bootstrap';
import {
  isTheSame
} from 'martingale-utils';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
//import 'react-table/react-table.css';

const upperFirst=(s)=>s.charAt(0).toUpperCase()+s.slice(1);

// TODO: Replace with https://github.com/tannerlinsley/react-table

const SPECIAL_CASE=[
  'ID',
  'HTTP',
  'HTTPS',
  'URI',
  'URL',
  'API',
  {key: 'URIS', value: 'URI\'s'},
  {key: 'URLS', value: 'URL\'s'}
];
const upperIt=(s)=>{
  const su = s.toUpperCase();
  return SPECIAL_CASE.reduce((res, map)=>{
    if(map===su){
      return map;
    }
    if(map.key===su){
      return map.value;
    }
    return res;
  }, upperFirst(s)).replace(/([a-z])([A-Z])/g, (match, first, second)=>{
    return `${first} ${second}`
  }).replace(/([a-z])_([a-z])/gi, (match, first, second)=>{
    return `${first} ${second}`
  });
};

const makeCaption=(src)=>src.replace(/_/g, ' ').replace(/[ \t]+/, ' ').trim().split(' ').map(upperIt).join(' ');

class Table extends Component{
  static propTypes = {
    items: PropTypes.array
  };

  constructor(props){
    super(props);
    this.state = {data: props.data};
  }

  componentWillReceiveProps(newProps){
    if(newProps.data && !isTheSame(this.state.data, newProps.data)){
      this.setState({data: newProps.data});
    }
  }

  getData(){
    const {
      data: raw
    } = this.state;
    if(!raw){
      return [];
    }
    const data = this.props.mapRoot?raw[this.props.mapRoot]:raw;
    if(!data){
      return [];
    }
    if(typeof(this.props.mapper) === 'function'){
      if(Array.isArray(data)){
        return data.map(this.props.mapper);
      }
      return this.props.mapper(data);
    }
    return Array.isArray(data)?data:[];
  }

  getDisplayValue(from, data){
    const type = typeof(from);
    if(type === 'string'){
      return from;
    }
    if(type === 'number'){
      return from;
    }
    if(type === 'boolean'){
      return from?'True':'False';
    }
    if(type === 'object'){
      if(from instanceof Date){
        return from.toISOString();
      }
      if(React.isValidElement(from)){
        return from;
      }
    }
    if(type === 'function'){
      return from(data);
    }
    return <pre>{JSON.stringify(from, null, 2)}</pre>;
  }

  getTableSettings(rawData){
    const data = rawData.map((d)=>{
      if(typeof(d)==='object'){
        if((!(d instanceof Date)) && (!(d instanceof RegExp))){
          return d;
        }
      }
      return {
        value: d
      };
    });
    const headers = data.reduce((headers, rec)=>{
      if(typeof(rec)!=='object'){
        return headers;
      }
      return Object.keys(rec).reduce((headers, header)=>{
        if ( headers.findIndex((h)=>h.key===header)>-1 ) {
          return headers;
        }
        return headers.concat({
          key: header,
          caption: makeCaption(header)
        });
      }, headers);
    }, []);
    const trHeaders = headers.map((header)=><th key={header.key}>{header.caption}</th>);
    const tbody = data.map((item, rowIndex)=>{
      const fields = headers.map((field, index)=>(
          <td key={index}>
            {field.key==='#'?rowIndex+1:(typeof(item[field.key])!=='undefined'?this.getDisplayValue(item[field.key], item):'')}
          </td>
        ));
      return (
        <tr key={rowIndex}>
          {fields}
        </tr>
      );
    });
    return {
      trHeaders,
      tbody
    };
  }

  getTable_old(){
    const data = this.getData();
    if (!data || !data.length){
      return <div />
    }
    const {
      trHeaders,
      tbody
    } = this.getTableSettings(Array.isArray(data)?data:[]);
    return (
      <BSTable striped bordered condensed hover>
        <thead>
          <tr>{trHeaders}</tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </BSTable>
    );
  }

  getFilterValue(from){
    const type = typeof(from);
    if(type === 'string'){
      return from;
    }
    if(type === 'number'){
      return String(from);
    }
    if(type === 'boolean'){
      return from?'True':'False';
    }
    if(type === 'object'){
      if(from instanceof Date){
        return from.toISOString();
      }
      if(React.isValidElement(from)){
        return String(from);
      }
    }
    if(type === 'function'){
      return from(data);
    }
    return JSON.stringify(from, null, 2);
  }

  getTable(){
    const getDisplayValue = this.getDisplayValue.bind(this);
    const rawData = this.getData();
    const columns = rawData.reduce((headers, rec)=>{
      return Object.keys(rec).reduce((headers, header)=>{
        if ( headers.findIndex((h)=>h.key===header)>-1 ) {
          return headers;
        }
        return headers.concat({
          key: header,
          accessor: header,
          Cell({original: data}){
            return getDisplayValue(data[header], data);
          },
          Header: makeCaption(header)
        });
      }, headers);
    }, []);
    const data = rawData;
    const defaultFilterMethod = (filter, row, column)=>{
      const id = filter.pivotId || filter.id;
      return row[id] !== undefined ? this.getFilterValue(row[id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1 : true;
    };
    return <ReactTable
      minRows={0}
      filterable={true}
      data={data}
      columns={columns}
      defaultFilterMethod={defaultFilterMethod}
    />
  }

  render(){
    return this.getTable();
  }
};

export {
  Table
};
