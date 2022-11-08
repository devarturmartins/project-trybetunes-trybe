import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { previewUrl,
      trackName, trackId, favorites, checked } = this.props;
    return (
      <div>
        <div>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ trackId }
          >
            Favorita
            <input
              key={ trackName }
              name={ trackName }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ favorites }
              id={ trackId }
              type="checkbox"
              checked={ checked }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  // removeMusicFavorites: PropTypes.func.isRequired,
};
