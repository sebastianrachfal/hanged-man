import React from 'react';
import Button from '../Button/Button';

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.categorySelect = this.categorySelect.bind(this);
    this.randomTab = { randomCat: true, addedCategories: props.categories.map(e => ({ name: e, selected: false })) };
    this.state = { randomLetter: false, difficulty: 0, ...this.randomTab };
  }
  categorySelect(category) {
    if (category !== undefined) {
      let newCat = [];
      let shouldBeRandom = true;
      for (let el of this.state.addedCategories) {
        let tempEl = {};
        if (el.name === category) tempEl = { name: el.name, selected: !el.selected };
        else tempEl = el;
        if (tempEl.selected === true) shouldBeRandom = false;
        newCat.push(tempEl);
      }
      this.setState({ randomCat: shouldBeRandom, addedCategories: newCat });
    } else this.setState(this.randomTab);
  }

  render() {
    let i = 0;
    return (
      <div className="menu">
        <span className="menu__heading">Gra w wisielca!</span>
        <div className="categories">
          <span className="categories__heading">Wybierz kategorie:</span>
          <div className="categories__random">
            <Button text="Losowa" addClass={'menu__button categories__button ' + (this.state.randomCat ? 'categories__button--selected' : '')} click={() => this.categorySelect()} />
          </div>
          <div className="categories__additional">
            {this.state.addedCategories.map(e => (
              <Button
                key={'category_' + i++}
                text={e.name}
                addClass={'menu__button categories__button ' + (e.selected ? 'categories__button--selected' : '')}
                click={() => this.categorySelect(e.name)}
              />
            ))}
          </div>
          <span className="categories__heading">Wybierz poziom trudności:</span>
          <div className="categories__difficulty">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                text={'Łatwy'}
                addClass={'menu__button categories__button categories__button__diff ' + (this.state.difficulty === 0 ? 'categories__button--selected' : '')}
                click={() => this.setState({ difficulty: 0 })}
              />
              <Button
                text={'Średni'}
                addClass={'menu__button categories__button categories__button__diff ' + (this.state.difficulty === 1 ? 'categories__button--selected' : '')}
                click={() => this.setState({ difficulty: 1 })}
              />
              <Button
                text={'Trudny'}
                addClass={'menu__button categories__button categories__button__diff ' + (this.state.difficulty === 2 ? 'categories__button--selected' : '')}
                click={() => this.setState({ difficulty: 2 })}
              />
            </div>
            <div className="categories__difficulty__letter">
              <input type="checkbox" onClick={() => this.setState({ randomLetter: !this.state.randomLetter })} /> <span>Losowa litera na start</span>
            </div>
          </div>
        </div>
        <Button
          text="Graj"
          addClass="menu__button menu__button__play"
          click={() => this.props.toggleGame(this.state.difficulty, this.state.randomCat ? [] : this.state.addedCategories.filter(e => e.selected).map(e => e.name), this.state.randomLetter)}
        />
      </div>
    );
  }
}
