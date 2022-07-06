import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actDeleteExpense, actUpdateTotalExpenses } from '../actions';

class ExpensesTable extends Component {
  handleDeleteButton = (id) => {
    const { deleteExpense, updateTotalExpenses } = this.props;
    deleteExpense(id);
    updateTotalExpenses();
  }

  render() {
    const {
      props: { expenses },
      handleDeleteButton,
    } = this;
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Tag</th>
            <th scope="col">Descrição</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map(({
              value,
              id,
              currency,
              exchangeRates,
              tag,
              description,
              method,
            }) => {
              const valueToFixed = (+value).toFixed(2);
              const unabbreviatedCurrency = exchangeRates
                ? exchangeRates[currency].name.split('/Real Brasileiro')[0]
                : null;
              const exchange = exchangeRates
                ? (+exchangeRates[currency].ask).toFixed(2)
                : null;
              const convertedValue = exchangeRates
                ? (value * exchangeRates[currency].ask).toFixed(2)
                : null;
              return (
                <tr key={ id }>
                  <td>{ valueToFixed }</td>
                  <td>{ unabbreviatedCurrency }</td>
                  <td>{ exchange }</td>
                  <td>Real</td>
                  <td>{ convertedValue }</td>
                  <td>{ tag }</td>
                  <td>{ description }</td>
                  <td>{ method }</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => handleDeleteButton(id) }
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(actDeleteExpense(id)),
  updateTotalExpenses: () => dispatch(actUpdateTotalExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
