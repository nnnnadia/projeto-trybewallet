import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);
