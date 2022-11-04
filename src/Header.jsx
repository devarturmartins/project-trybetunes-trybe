import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './pages/Loading';
import { getUser } from './services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
    loading: false,
  };

  componentDidMount() {
    this.showUser();
  }

  showUser = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      user: user.name,
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component">Header</header>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritos
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </nav>
        {
          loading
            ? <Loading />
            : <div data-testid="header-user-name">{ user }</div>
        }
      </div>
    );
  }
}
