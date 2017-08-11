import React, { Component } from 'react';
import {Table as BSTable} from 'react-bootstrap';
import {
  isTheSame
} from 'martingale-utils';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import YAML from 'js-yaml';
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
    items: PropTypes.array,
    columns: PropTypes.array,
    suppress: PropTypes.array,
    filterable: PropTypes.bool,
    showPagination: PropTypes.bool,
    showPaginationBottom: PropTypes.bool,
    showPaginationTop: PropTypes.bool
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
      const mappedData = this.props.mapper(data);
      if(!mappedData){
        return [];
      }
      return mappedData;
    }
    return Array.isArray(data)?data:[];
  }

  getDisplayValue(from, data){
    const type = typeof(from);
    if(type === 'string'){
      return <div className="hide-overflow">{from}</div>;
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
    if(typeof(from) !== 'undefined'){
      //return <pre>{JSON.stringify(from, null, 2)}</pre>;
      return <pre>{YAML.safeDump(from, {indent: 2})}</pre>;
    }
    return from;
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
    const suppress = Array.isArray(this.props.suppress)?this.props.suppress:[];
    const columns = this.props.columns?this.props.columns.map((c)=>{
      if(typeof(c)==='string'){
        return {
          key: c,
          accessor: c,
          Cell({original: data}){
            return getDisplayValue(data[c], data);
          },
          Header: makeCaption(c)
        };
      }
      return {
        key: c.value,
        accessor: c.value,
        width: c.width,
        Cell({original: data}){
          return getDisplayValue(data[c.value], data);
        },
        Header: typeof(c.caption)==='undefined'?makeCaption(c.value):c.caption
      };
    }):rawData.reduce((headers, rec)=>{
      return Object.keys(rec).reduce((headers, header)=>{
        if(suppress.indexOf(header)>-1){
          return headers;
        }
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
    const {
      filterable = true,
      showPagination = true,
      showPaginationBottom=true,
      showPaginationTop=false
    } = this.props;
    return <ReactTable
      className="-striped -highlight"
      minRows={0}
      filterable={filterable}
      data={data}
      columns={columns}
      defaultFilterMethod={defaultFilterMethod}
      showPagination={showPagination}
      showPaginationTop={showPaginationTop}
      showPaginationBottom={showPaginationBottom}
    />
  }

  render(){
    return this.getTable();
  }
};

export {
  Table
};
