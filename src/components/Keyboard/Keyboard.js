import React from 'react';
import Button from '../Button/Button';

// TODO: Another keyboard layout variant
const keyLayoutVariants = {
  basic: [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ]
};

export default class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: [] };
    this.clickedLetter = this.clickedLetter.bind(this);
  }
  clickedLetter(letter) {
    this.props.fnClicked(letter);
    this.setState({ clicked: [...this.state.clicked, letter] });
  }
  render() {
    let i = 0,
      j = 0;
    return (
      <div className="keyboard__wrapper">
        {keyLayoutVariants['basic'].map(e => (
          <div className="keyboard__row" key={'key_row_' + j++}>
            {e.map(f => (
              <Button
                addClass={this.state.clicked.indexOf(f) === -1 ? 'keyboard__button' : 'keyboard__button keyboard__button--disabled'}
                click={this.state.clicked.indexOf(f) === -1 ? () => this.clickedLetter(f) : undefined}
                key={'key_' + i++}
                text={f.toUpperCase()}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
