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
    const { nameInput, descriptionInput, emailInput, imageInput } = this.state;
    const { history } = this.props;
    this.setState({
      logado: true,
    });
    await createUser({ name: nameInput,
      description: descriptionInput,
      email: emailInput,
      image: imageInput });
    history.push('/search');
  };

  onInputChange = (event) => {
    const validation = event.target.value.length;
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (validation > 2) {
      this.setState({
        buttonDisabled: false,
      });
    }
  };

  render() {
    const { logado,
      buttonDisabled, nameInput, emailInput, descriptionInput, imageInput } = this.state;
    return (
      <div data-testid="page-login">
        {
          logado ? <Loading /> : (
            <form>
              <input
                data-testid="login-name-input"
                placeholder="Digite seu nome"
                onChange={ this.onInputChange }
                name="nameInput"
                value={ nameInput }
              />
              <input
                data-testid="login-email-input"
                placeholder="Digite seu email"
                onChange={ this.onInputChange }
                name="emailInput"
                value={ emailInput }
              />
              <textarea
                data-testid="login-description-input"
                placeholder="Descricao"
                onChange={ this.onInputChange }
                name="descriptionInput"
                value={ descriptionInput }
              />
              <input
                data-testid="login-image-input"
                onChange={ this.onInputChange }
                name="imageInput"
                value={ imageInput }
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
