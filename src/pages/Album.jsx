import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends Component {
  state = {
    idAlbum: [],
    // listFavorites: [],
    favorito: false,
    checked: {},
  };

  async componentDidMount() {
    this.musicAlbum();
  }

  musicAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      idAlbum: response,
    }, this.recoverSongs);
  };

  favorites = async (event) => {
    const { idAlbum } = this.state;
    const { id, name, checked } = event.target;
    this.setState((prev) => ({
      checked: { ...prev.checked, [name]: checked },
    }));
    if (checked) {
      this.setState({ favorito: true }, async () => {
        const removeElement = idAlbum.slice(1);
        const idFavorito = removeElement.find((element) => element.trackId === +id);
        await addSong(idFavorito);
        this.setState({ favorito: false });
      });
    } else {
      this.setState({ favorito: true }, async () => {
        const idFavorito = idAlbum.find((element) => element.trackId === +id);
        await removeSong(idFavorito);
        this.setState({ favorito: false });
      });
    }
  };

  recoverSongs = async () => {
    const { idAlbum } = this.state;
    const storage = await getFavoriteSongs();
    const musicFavor = storage.filter((e) => e.artistId === idAlbum[0].artistId);
    // this.setState({ listFavorites: musicFavor });
    if (musicFavor.length > 0) {
      this.setState({ favorito: true }, () => {
        musicFavor.forEach((e) => {
          this.setState((prev) => ({
            checked: { ...prev.checked, [e.trackName]: true },
            favorito: false,
          }));
        });
      });
    }
  };

  render() {
    const { idAlbum, favorito, checked } = this.state;
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
                checked={ checked[e.trackName] }
                name={ e.trackName }
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
