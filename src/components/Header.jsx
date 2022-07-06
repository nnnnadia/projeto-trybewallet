import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actUpdateTotalExpenses } from '../actions';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  render() {
    const {
      props: { email, total, updateTotalExpenses },
      state: { currency },
    } = this;
    updateTotalExpenses();
    return (
      <header>
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field">
          { total }
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
  ]),
  updateTotalExpenses: PropTypes.func.isRequired,
};

Header.defaultProps = {
  total: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateTotalExpenses: () => dispatch(actUpdateTotalExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
