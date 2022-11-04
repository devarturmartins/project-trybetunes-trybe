import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    buttonDisabled: true,
    nameInput: '',
    logado: false,
  };

  clickButton = async () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({
      logado: true,
    });
    await createUser({ name: nameInput });
    history.push('/search');
  };

  onInputChange = (event) => {
    const validation = event.target.value.length;
    if (validation > 2) {
      this.setState({
        buttonDisabled: false,
        nameInput: event.target.value,
      });
    }
  };

  render() {
    const { logado, buttonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        {
          logado ? <Loading /> : (
            <form>
              <input
                data-testid="login-name-input"
                placeholder="Digite seu nome"
                onChange={ this.onInputChange }
              />
              <button
                disabled={ buttonDisabled }
                type="button"
                data-testid="login-submit-button"
                onClick={ this.clickButton }
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
