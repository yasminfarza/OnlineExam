import React, { Component } from "react";
import Routes from "./routes/Routes";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;