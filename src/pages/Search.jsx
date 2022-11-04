import React, { Component } from 'react';
import Header from '../Header';

export default class Search extends Component {
  state = {
    buttonDisabled: true,
  };

  onInputChange = (event) => {
    const validation = event.target.value.length;
    if (validation > 1) {
      this.setState({
        buttonDisabled: false,
      });
    }
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Busque por artista ou banda"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
