import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import uuid from "react-uuid";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  //1.we're taking the 'apple' splitting it into an array (split every character)
  //2.mapping it into a new array.
  //- That is going to return the _ character or the actual letter
  //3.cheking inside this.state.guessed is a new Set().
  //- Which at the beggining is an empty set. But eventually might contain some
  // other letters . So if the user guessed the letter we're going to put the letter in
  // otherwise we place a "_"
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  //1. theres a evt.target.value
  // (so if you click on the button you have access to what was clicked on)
  //2. then we're setting state guessed(which inclued all the letters currently guessed)
  // and adding whatever ltr pressed into that state
  //3. then we're potentialy updating nWrong
  // - so if the answer inclueds that letter we're going to add zero to nWrong
  // if it doesnt include it we add 1(that increments nWrong by 1)
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  // we take a string of all letters(26) and split it into an array
  // and then we map over it for each letter we make a new button
  // that button has a value set to ltr and a disabled attribute
  // which is going ot prevent us from clicking a ltr that has been clicked
  // it has some style for when the button is disabled (.Hangman button:disabled)
  // so in disabled were checking if the guessed set already has this ltr
  // and the text inside the button is the ltr itself{ltr}
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={uuid()}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  // reset button
  handleReset = () => {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    /* Compare the string version of this.state.guessedWord below */
    const isWinner = this.guessedWord().join("") === this.state.answer && (
      <p>You Win</p>
    );
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win";
    if (gameOver) gameState = "You Loose";
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`Wrong Guesses: ${this.state.nWrong} `}
        />
        <p>Wrong Guesses: {this.state.nWrong} </p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">{gameState}</p>
        <button id="reset" onClick={this.handleReset}>
          Restart?
        </button>
      </div>
    );
  }
}

export default Hangman;
