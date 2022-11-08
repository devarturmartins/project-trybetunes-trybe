import React, { Component } from 'react';
import Header from '../Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.editProfile();
  }

  editProfile = async () => {
    const user = await getUser();
    this.setState({ user });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading />
            : (
              <form>
                <input data-testid="edit-input-name" />
                <input data-testid="edit-input-email" />
                <input data-testid="edit-input-description" />
                <input data-testid="edit-input-image" />
                <button type="button" data-testid="edit-button-save">Salvar</button>
              </form>
            )
        }
      </div>
    );
  }
}
