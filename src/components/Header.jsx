import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    expenses: 0,
    currency: 'BRL',
  };

  render() {
    const {
      props: { email },
      state: { expenses, currency },
    } = this;
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field">
          { expenses }
        </h4>
        <span data-testid="header-currency-field">
          { currency }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
