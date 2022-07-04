import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  render() {
    const {
      props: { email, total },
      state: { currency },
    } = this;
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field">
          { total || 0 }
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
  total: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
