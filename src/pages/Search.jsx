import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    buttonDisabled: true,
    nameInput: '',
    artistName: '',
    loading: false,
    albums: [],
  };

  onClickSearch = async () => {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    });
    const response = await searchAlbumsAPI(nameInput);
    this.setState({
      nameInput: '',
      loading: false,
      albums: response,
    });
    // console.log(response);
  };

  onInputChange = (event) => {
    const validation = event.target.value.length;
    this.setState({
      nameInput: event.target.value,
      artistName: event.target.value,
    });
    if (validation > 1) {
      this.setState({
        buttonDisabled: false,
      });
    }
  };

  render() {
    const { buttonDisabled, nameInput, loading, albums, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div>
                <form>
                  <input
                    type="text"
                    data-testid="search-artist-input"
                    placeholder="Busque por artista ou banda"
                    onChange={ this.onInputChange }
                    value={ nameInput }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ buttonDisabled }
                    onClick={ this.onClickSearch }
                  >
                    Pesquisar
                  </button>
                </form>
                <p>{`Resultado de álbuns de: ${artistName}`}</p>
                {
                  albums.length === 0 && (<p>Nenhum álbum foi encontrado</p>)
                }

                {
                  albums.map((element) => {
                    console.log(element);
                    return (
                      <div
                        key={ element.collectionId }
                      >
                        <p>
                          <Link
                            data-testid={ `link-to-album-${element.collectionId}` }
                            to={ `/album/${element.collectionId}` }
                          >
                            { element.collectionName }
                          </Link>
                        </p>
                      </div>
                    );
                  })
                }
              </div>
            )
        }
      </div>
    );
  }
}
