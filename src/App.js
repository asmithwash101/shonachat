import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';


//pages
import Chat from './pages/chat'



function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" component={Chat}  />
        </Switch>
      </Router>

    </React.Fragment>
  );
}

export default App;
