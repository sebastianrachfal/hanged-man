import React from 'react';
import Game from './components/Game/Game';
import Keyboard from './components/Keyboard/Keyboard';
import MainMenu from './components/MainMenu/MainMenu';
import Button from './components/Button/Button';
import Words from './assets/words';
import './App.scss';

const DIFF = ['easy', 'medium', 'hard'];
class App extends React.Component {
  constructor() {
    super();
    this.state = { event: '', word: '', gameStarted: false, clicked: [] };
    this.toggleGame = this.toggleGame.bind(this);
    this.gameEvent = this.gameEvent.bind(this);
    this.replayGame = this.replayGame.bind(this);
    this.contentScreen = React.createRef();
  }
  toggleGame(difficulty, categories, randomLetter) {
    this.contentScreen.current.style.opacity = 0;
    setTimeout(() => {
      this.contentScreen.current.style.opacity = 1;
      if (categories.length === 0) categories = Object.keys(Words);
      let cat = categories[Math.round(Math.random() * (categories.length - 1))];
      let word = Words[cat][DIFF[difficulty]][Math.round(Math.random() * (Words.Imiona.easy.length - 1))];
      this.setState({
        word: word,
        gameStarted: !this.state.gameStarted,
        pickedCategory: cat,
        randomLetter: randomLetter ? word[Math.round(Math.random() * (word.length - 1))] : ''
      });
    }, 1000);
  }
  gameEvent(event) {
    setTimeout(() => {
      this.contentScreen.current.style.opacity = 0;
      setTimeout(() => {
        this.setState({ event: event });
        this.contentScreen.current.style.opacity = 1;
      }, 1000);
    }, 750);
  }
  replayGame() {
    this.contentScreen.current.style.opacity = 0;
    setTimeout(() => {
      this.setState({ event: '', word: '', gameStarted: false, clicked: [] });
      this.contentScreen.current.style.opacity = 1;
    }, 1000);
  }
  render() {
    return (
      <div className="app">
        <div className="content" ref={this.contentScreen}>
          {this.state.gameStarted ? (
            this.state.event.length > 0 ? (
              <div className="menu__ending">
                <div className="menu__heading">{this.state.event === 'win' ? 'Gratulacje, twoje słowo to: ' + this.state.word + '!' : 'Niestety, może uda się następnym razem.'}</div>
                <div>Aby zagrać jeszcze raz, naciśnij przycisk poniżej.</div>
                <Button addClass="menu__button menu__button__play" text="Zagraj ponownie" click={this.replayGame} />
              </div>
            ) : (
              <div className="content__wrapper">
                <Game category={this.state.pickedCategory} gameEvent={this.gameEvent} currentWord={this.state.word} clicked={this.state.clicked} />
                <div className="keyboard">
                  <Keyboard randomLetter={this.state.randomLetter || null} fnClicked={letter => this.setState({ clicked: [...this.state.clicked, letter] })} />
                </div>
              </div>
            )
          ) : (
            <div className="content__wrapper">
              <MainMenu toggleGame={this.toggleGame} categories={Object.keys(Words)} />
            </div>
          )}
        </div>
        <div className="footing">
          <span>Sebastian Rachfał | 2020</span>
        </div>
      </div>
    );
  }
}

export default App;
