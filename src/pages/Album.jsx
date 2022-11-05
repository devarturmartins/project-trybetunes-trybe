import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends Component {
  state = {
    idAlbum: [],
    favorito: false,
  };

  componentDidMount() {
    this.musicAlbum();
  }

  musicAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      idAlbum: response,
    });
  };

  favorites = async (event) => {
    const { idAlbum } = this.state;
    const { id } = event.target;
    this.setState({ favorito: true });
    const idFavorito = idAlbum.find((element) => element.trackId === Number(id));
    await addSong(idFavorito);
    this.setState({ favorito: false });
  };

  render() {
    const { idAlbum, favorito } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          favorito && <Loading />
        }
        {
          idAlbum.map((e, index) => (
            index === 0 ? (
              <div key={ e.collectionId }>
                <p data-testid="artist-name">{ e.artistName }</p>
                <p data-testid="album-name">{ e.collectionName }</p>
              </div>
            ) : (
              <MusicCard
                favorites={ this.favorites }
                trackId={ e.trackId }
                trackName={ e.trackName }
                src={ e.previewUrl }
              />
            )
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
