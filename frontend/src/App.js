import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import Base from "./components/base";
import Profile from "./components/profile";
import AddFilm from "./components/addFilm";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Base} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addFilm" component={AddFilm} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
