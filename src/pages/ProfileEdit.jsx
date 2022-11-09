import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    inputDescription: '',
    inputImage: '',
    loading: false,
    isDisabled: false,
    profile: false,
  };

  componentDidMount() {
    this.editProfile();
  }

  editProfile = async () => {
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      inputName: name,
      inputEmail: email,
      inputDescription: description,
      inputImage: image,
      isDisabled: true,
      loading: false,
    });
  };

  onInputChange = (event) => {
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    const { value, name } = event.target;
    const MIN_CHARAPTERS = 0;
    const validateInputName = inputName.length > MIN_CHARAPTERS;
    const validateInputEmail = inputEmail.length > MIN_CHARAPTERS;
    const validateInputDescription = inputDescription.length > MIN_CHARAPTERS;
    const validateInputImage = inputImage.length > MIN_CHARAPTERS;
    this.setState({ [name]: value });
    const validation = validateInputName
    && validateInputEmail && validateInputDescription && validateInputImage;
    if (validation) {
      this.setState({ isDisabled: false });
    }
    // } else {
    //   this.setState({ isDisabled: false });
    // }
  };

  saveEditProfile = async () => {
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    this.setState({ loading: true });
    await updateUser({
      name: inputName,
      email: inputEmail,
      description: inputDescription,
      image: inputImage,
    });
    const { history } = this.props;
    history.push('/profile');
    // this.setState({ profile: true });
  };

  render() {
    const { loading,
      inputName,
      inputEmail, inputDescription, inputImage, isDisabled, profile } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading />
            : (
              <form>
                <input
                  name="inputName"
                  type="text"
                  value={ inputName }
                  data-testid="edit-input-name"
                  placeholder="Name"
                  onChange={ this.onInputChange }
                />
                <input
                  name="inputEmail"
                  type="text"
                  value={ inputEmail }
                  data-testid="edit-input-email"
                  onChange={ this.onInputChange }
                />
                <input
                  name="inputDescription"
                  type="text"
                  value={ inputDescription }
                  data-testid="edit-input-description"
                  onChange={ this.onInputChange }
                />
                <input
                  name="inputImage"
                  type="text"
                  value={ inputImage }
                  data-testid="edit-input-image"
                  onChange={ this.onInputChange }
                />
                <button
                  disabled={ isDisabled }
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.saveEditProfile }
                >
                  Editar perfil
                </button>
              </form>
            )
        }
        {
          profile && <Redirect to="/profile" />
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
