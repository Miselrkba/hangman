import React, { Component } from "react";
import "./App.css";
import Hangman from "./Hangman";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hangman />
      </div>
    );
  }
}

export default App;





  //  words.split("")
  //   .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));

  // const split = words.split("")
  // console.log(split); 

  const words = [
    "their",
      "would",
      "about",
      "there",
      "think",
    ]

   let guessed= new Set()

   guessed.has(1) ? 1 : "_"
  
  console.log(guessed);