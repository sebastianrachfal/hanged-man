import React from 'react';
import Game from './components/Game/Game';
import Keyboard from './components/Keyboard/Keyboard';
import MainMenu from './components/MainMenu/MainMenu';
import Words from './assets/words';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = { word: 'haha', gameStarted: false, clicked: [] };
    this.toggleGame = this.toggleGame.bind(this);
    this.menuScreen = React.createRef();
    this.gameScreen = React.createRef();
  }
  toggleGame(difficulty, categories, randomLetter) {
    console.log(difficulty, categories, randomLetter);
    this.menuScreen.current.style.opacity = 0;
    setTimeout(() => {
      this.setState({ word: Words.Imiona.easy[Math.round(Math.random() * (Words.Imiona.easy.length - 1))], gameStarted: !this.state.gameStarted });
      this.gameScreen.current.style.opacity = 1;
    }, 1000);
  }
  render() {
    return (
      <div className="app">
        {this.state.gameStarted ? (
          <div className="content" ref={this.gameScreen}>
            <Game currentWord={this.state.word} clicked={this.state.clicked} />
            <div className="keyboard">
              <Keyboard fnClicked={letter => this.setState({ clicked: [...this.state.clicked, letter] })} />
            </div>
          </div>
        ) : (
          <div className="content" ref={this.menuScreen}>
            <MainMenu toggleGame={this.toggleGame} categories={Object.keys(Words)} />
          </div>
        )}

        <div className="footing">
          <span>Sebastian Rachfał | 2020</span>
        </div>
      </div>
    );
  }
}

export default App;
