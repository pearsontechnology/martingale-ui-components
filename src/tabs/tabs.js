import React from 'react';
import {
  Nav,
  NavItem,
  NavDropdown
} from 'react-bootstrap';
import Panel from '../Panels/Panel';
import PropTypes from 'prop-types';

const TabContent = ({children, inset = true})=>{
  return (
    <div className={`tab contents ${inset?'inset':''}`}>
      {children}
    </div>
  );
};

/**
 * Renders a section of tabs and proper content when a tab is selected
 * @param {object} props
 * @param {array} props.tabs - The items to be displayed within the table
 * @param {array} props.tabs.title - Title of the tab
 * @param {array} props.tabs.children - Children displayed when tab is selected
 * @param {number} props.selected - Number of currently selected tab
 */
class Tabs extends React.Component{
  static propTypes = {
    tabs: PropTypes.array,
    selected: PropTypes.number
  };

  constructor({selected = 0}){
    super();
    this.state = {selected};
  }

  handleSelect(selected){
    this.setState({selected});
  }

  renderTabs(){
    const {
      selected
    } = this.state;
    const {
      tabs: tabsList = [],
      inset = true,
      footer
    } = this.props;
    const tabs = tabsList.map(({title}, index)=><NavItem key={index} eventKey={index} title={title}>{title}</NavItem>);
    const visibleTab = tabsList[selected];
    return (
        <Panel>
          <Nav bsStyle="tabs" activeKey={selected} onSelect={this.handleSelect.bind(this)}>
            {tabs}
          </Nav>
          <TabContent inset={inset} {...visibleTab} />
          {footer}
        </Panel>
      );
  }

  render(){
    return this.renderTabs();
  }
};

export {
  Tabs
};
