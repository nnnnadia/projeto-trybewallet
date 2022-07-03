import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actSaveUserEmail } from '../actions';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    isLoginButtonDisabled: true,
  };

  validadeInput = () => {
    const { email, password } = this.state;
    const emailValidated = /[\d|\w|\\.]+@[\w]+\.[\w]+/i.test(email);
    const passwordValidated = /[\d|\w]{6,}/i.test(password);
    const validated = !emailValidated || !passwordValidated;
    this.setState({ isLoginButtonDisabled: validated });
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validadeInput());
  }

  handleLogin = (event) => {
    event.preventDefault();
    const {
      state: { email },
      props: { history, saveUserEmail },
    } = this;
    saveUserEmail(email);
    history.push('/carteira');
  }

  render() {
    const {
      state: {
        email,
        password,
        isLoginButtonDisabled,
      },
      handleInputChange,
      handleLogin,
    } = this;
    return (
      <form
        onSubmit={ handleLogin }
      >
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ handleInputChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ handleInputChange }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ isLoginButtonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveUserEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUserEmail: (email) => dispatch(actSaveUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
