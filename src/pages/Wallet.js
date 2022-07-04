import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesInitials } from '../actions';
import { Header, ExpenseForm } from '../components';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrenciesInit } = this.props;
    fetchCurrenciesInit();
  }

  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  fetchCurrenciesInit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesInit: () => dispatch(fetchCurrenciesInitials()),
});

export default connect(null, mapDispatchToProps)(Wallet);
