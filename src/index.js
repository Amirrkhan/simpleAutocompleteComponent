import ReactDOM from "react-dom";
import React, { Component } from "react";
// COMPONENTS
import Input from "./Components/Input";
import "./index.css";

class App extends Component {
  czCities = [
    "Praha",
    "Brno",
    "Ostrava",
    "Plsen",
    "Olomouc",
    "Liberec",
    "Ceske Budejovice",
    "Hradec Kralove",
    "Usti nad Labem",
    "Pardubice"
  ];

  render() {
    return (
      <div className="app">
        <Input
          autocompleteData={this.czCities}
          sortSuggestions="alphabetically"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
