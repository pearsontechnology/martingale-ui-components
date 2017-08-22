import React from 'react';
import {betterType} from 'martingale-utils';
import Panel from '../Panels/Panel';

class TreeNodeItem extends React.Component{
  render(){
    const {
      node_name,
      level,
      children
    } = this.props;
    return (
      <li key={node_name || level} className={`tree-node level-${level}`}>
        {node_name?`${node_name} - `:''}{children}
      </li>
    );
  }
};

class TreeNode extends React.Component{
  renderList(options, nodes){
    const {node_name, level} = options;
    if(node_name){
      return (
        <TreeNodeItem node_name={node_name} key={node_name || level}>
          <ul className="list-group">
            {nodes}
          </ul>
        </TreeNodeItem>
      );
    }
    return (
      <ul key={node_name || level} className="list-group">
        {nodes}
      </ul>
    );
  }

  render_object(options){
    const {node_name, data, level: atLevel} = options;
    if(!data){
      return <TreeNodeItem node_name={node_name} key={node_name || level} />;
    }
    const level = atLevel + 1;
    const nodes = Object.keys(data).map((key)=>{
      const nodeData = data[key];
      return <TreeNode visible={true} {...options} key={key} node_name={key} data={nodeData} level={level} />;
    });
    return this.renderList(options, nodes);
  }

  render_array(option){
    const {node_name, data, level: atLevel} = options;
    if(!data){
      return <TreeNodeItem node_name={node_name} key={node_name || level} />;
    }
    const level = atLevel + 1;
    const nodes = data.map((key)=>{
      const nodeData = data[key];
      return <TreeNode visible={true} {...options} key={key} node_name={key} data={nodeData} level={level} />;
    });
    return this.renderList(options, nodes);
  }

  render_default({node_name, data, editable}){
    return <TreeNodeItem node_name={node_name} key={node_name || level}>{data}</TreeNodeItem>;
  }

  render(){
    const {
      data
    } = this.props;
    const type = betterType(data);
    const f = (this[`render_${type}`] || this.render_default).bind(this);
    return f(this.props);
  }
};

class TreeView extends React.Component{
  renderTreeview(){
    const {
      data,
      ...options
    } = this.props;
    return (
      <Panel inset={true}>
        <div className="treeview">
          <TreeNode level={1} data={data} visible={true} {...options} />
        </div>
      </Panel>
    );
  }

  render(){
    return this.renderTreeview();
  }
};

export default TreeView;
