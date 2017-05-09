import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import KitchenSink from './kitchensink';

class App extends Component {
  render() {
    return (
      <Router>
        <Route render={({ location }) => (
            <Switch key={location.pathname} location={location}>
              <Route exact path="/" render={(match)=>{
                return React.createElement(KitchenSink, match.params);
              }} />
            </Switch>
        )}/>
      </Router>
    );
  }
}

export default App;
