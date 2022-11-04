import React, { Component } from 'react';
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
        {
          loading
            ? <Loading />
            : <div data-testid="header-user-name">{ user }</div>
        }
      </div>
    );
  }
}
