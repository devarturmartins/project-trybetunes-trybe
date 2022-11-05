import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId, favorites } = this.props;
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
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              onClick={ favorites }
              id={ trackId }
              type="checkbox"
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
};
