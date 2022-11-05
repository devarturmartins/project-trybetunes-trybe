import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  state = {
    idAlbum: [],
  };

  componentDidMount() {
    this.musicAlbum();
  }

  musicAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    console.log(response);
    this.setState({
      idAlbum: response,
    });
  };

  render() {
    const { idAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          idAlbum.map((e, index) => (
            index === 0 ? (
              <div key={ e.collectionId }>
                <p data-testid="artist-name">{ e.artistName }</p>
                <p data-testid="album-name">{ e.collectionName }</p>
              </div>
            ) : (
              <MusicCard trackName={ e.trackName } src={ e.previewUrl } />
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
