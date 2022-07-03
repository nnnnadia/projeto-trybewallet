import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseForm extends Component {
  state = {
    expense: {
      value: 0,
      description: '',
      method: '',
      tag: '',
    },
    availableMethods: [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ],
    availableTags: [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ],
  }; // id, value, currency, method, tag, description e exchangeRates

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      state: {
        expense: {
          value,
          description,
        },
        availableMethods,
        availableTags,
      },
      props: {
        currencies,
      },
      handleInputChange,
    } = this;
    return (
      <form>
        <input
          type="number"
          step="10"
          name="value"
          value={ value }
          onChange={ handleInputChange }
          data-testid="value-input"
        />
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
          >
            { currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                { currency }
              </option>
            )) }
          </select>
        </label>
        <select
          name="method"
          data-testid="method-input"
        >
          { availableMethods.map((method, index) => (
            <option
              key={ index }
              value={ method }
            >
              { method }
            </option>
          ))}
        </select>
        <select
          name="tag"
          data-testid="tag-input"
        >
          { availableTags.map((tag, index) => (
            <option
              key={ index }
              value={ tag }
            >
              { tag }
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          value={ description }
          onChange={ handleInputChange }
          data-testid="description-input"
        />
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(ExpenseForm);
