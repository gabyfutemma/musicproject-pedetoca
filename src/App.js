import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Artists from "./components/Artists.js";
import Contact from "./components/Contact.js";


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
          <Route exact path="/" component={Home} />
          <Route exact path="/artists" component={Artists} />  
          <Route exact path="/contact" component={Contact} />          
      </React.Fragment>
    );
  }
}

export default App
