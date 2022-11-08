import React, { Component } from 'react';
import Header from '../Header';
// import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Favorites extends Component {
  state = {
    musicasFavoritas: [],
    loading: false,

  };

  // componentDidMount() {
  //   this.fav();
  // }

  // fav = async () => {
  //   this.setState({ loading: true });
  //   const storage = await getFavoriteSongs();
  //   this.setState({ musicasFavoritas: storage, loading: false });
  // };

  // removeMusicFavorites = async (musica) => {
  //   const { musicasFavoritas } = this.state;
  //   const validation = musicasFavoritas.filter((e) => e.trackName = musica.trackName);
  //   await removeSong(musica);
  //   this.setState({ musicasFavoritas: validation });
  // };

  render() {
    const { loading, musicasFavoritas } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading
            ? <Loading />
            : (
              musicasFavoritas.map((e) => (<MusicCard
                key={ e.trackId }
                trackName={ e.trackName }
                // checked={ checked }
                // musica={ e }
                // removeMusicFavorites={ this.removeMusicFavorites }
              />))
            )
        }
      </div>
    );
  }
}
