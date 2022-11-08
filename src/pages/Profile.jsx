import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.renderProfile();
  }

  renderProfile = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, user });
    console.log(user);
  };

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading />
            : (
              <div>
                <p>{ user.name }</p>
                <p>{ user.description }</p>
                <p>{ user.email }</p>
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ user.name }
                />
                <br />
                <Link to="profile/edit">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}
