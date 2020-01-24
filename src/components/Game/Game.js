import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentGame: this.props.currentWord.split('').map(e => ({ letter: e, discovered: false })) };
    this.clickedLength = 0;
    this.wordLeftovers = this.props.currentWord;
    this.gallows = [];
    this.errors = 0;
    for (let i = 0; i <= 10; i++) this.gallows[i] = React.createRef();
  }
  triggerGallows(n) {
    if (n > 10) return;
    this.gallows[n].current.style['stroke-dashoffset'] = 0;
    if (n === 10) this.props.gameEvent('loss');
  }
  componentDidMount() {
    for (let el of this.gallows) {
      el.current.style['stroke-dasharray'] = el.current.style['stroke-dashoffset'] = el.current.getTotalLength();
      setTimeout(() => el.current.classList.add('game__graphics__pathTransition'), 500);
    }
  }
  getSnapshotBeforeUpdate() {
    if (this.props.clicked.length > this.clickedLength) {
      this.clickedLength++;
      let currentWordSplit = this.props.currentWord.split('');
      let comp = this.props.clicked.filter(e => !currentWordSplit.includes(e));
      if (comp.length > this.errors) {
        this.triggerGallows(this.errors++);
      }
      return this.state.currentGame.map(e => ({ letter: e.letter, discovered: !(this.props.clicked.indexOf(e.letter) === -1) }));
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.setState({ currentGame: snapshot });

      this.wordLeftovers = this.wordLeftovers.split(this.props.clicked[this.props.clicked.length - 1]).join('');
      if (this.wordLeftovers.length === 0) this.props.gameEvent('win');
    }
  }
  render() {
    let i = 0;
    return (
      <div className="game">
        <div className="game__category">Kategoria: {this.props.category}</div>

        <div className="game__graphics">
          <svg className="game__graphics__svg" xmlns="http://www.w3.org/2000/svg" width="249" height="389" version="1.1" viewBox="0 0 64.327 102.923">
            <path ref={this.gallows[0]} className="game__graphics--thicker" opacity="1" d="m 0,294.88331 h 40.000001 v 0" />
            <path ref={this.gallows[1]} className="game__graphics--thicker" d="m 20.000001,295.95487 c 0,-101.86458 0,-101.86458 0,-101.86458" />
            <path ref={this.gallows[2]} className="game__graphics--thicker" d="M 18.4446,196.20696 H 58.444599" />
            <path ref={this.gallows[3]} className="game__graphics--thicker" d="M 19.885157,210.79211 33.478126,196.07466" />
            <path ref={this.gallows[4]} d="m 56.11411,195.60346 0.02164,18.55148" />
            <path
              ref={this.gallows[5]}
              d="m 56.124933,213.69341 a 7.6729164,7.6729164 0 0 1 7.67291,7.67292 7.6729164,7.6729164 0 0 1 -7.67291,7.67291 7.6729164,7.6729164 0 0 1 -7.67292,-7.67291 7.6729164,7.6729164 0 0 1 7.67292,-7.67292 z"
            />
            <path ref={this.gallows[6]} className="game__graphics--thick" d="m 56.078153,229.28292 0.09355,24.50862" />
            <path ref={this.gallows[7]} d="m 56.013791,229.74093 -5.940065,12.20753" />
            <path ref={this.gallows[8]} d="m 56.165907,229.74093 5.940065,12.20753" />
            <path ref={this.gallows[9]} d="m 55.92999,253.3706 -3.648228,17.25892" />
            <path ref={this.gallows[10]} d="m 56.41341,253.3706 3.648228,17.25892" />
          </svg>
        </div>
        <div className="game__text">
          {this.state.currentGame.map(e => (
            <div className="game__text__field" key={'field_' + i++}>
              <div className={e.discovered ? 'letter' : 'letter--hidden'}>{e.letter.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
