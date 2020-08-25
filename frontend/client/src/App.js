import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Login from './components/Login'
import Register from './components/Register'
import Base from './components/Base'
import Profile from './components/Profile'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <Route exact path = '/' component={Base}/>
          <div className="container">
          <Route exact path = '/register' component={Register}/>
          <Route exact path = '/login' component={Login}/>
          <Route exact path = '/profile' component={Profile}/>
          </div>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;
