import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h2>Login</h2>
        <LoginForm history={ history } />
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
