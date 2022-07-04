import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actSaveExpense, fetchExchangeRates } from '../actions';

class ExpenseForm extends Component {
  initialExpense = {
    value: 0,
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  state = {
    expense: this.initialExpense,
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
  };

  /*
  selecionaría sempre a primeira opção do select
  caso currency não fosse assícrono...
  componentDidMount() {
    const {
      state: {
        expense,
        availableMethods,
        availableTags,
      },
      props: {
        currencies,
      },
    } = this;
    this.setState({ expense: {
      ...expense,
      currency: currencies[0],
      method: availableMethods[0],
      tag: availableTags[0],
    } });
  }
  */

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const { expense } = this.state;
    this.setState({ expense: {
      ...expense,
      [name]: value,
    } });
  }

  handleSubmitExpense = (e) => {
    e.preventDefault();
    const {
      state: { expense },
      props: {
        savedExpenses,
        saveExpense,
        fetchRates,
      },
      initialExpense,
    } = this;
    saveExpense({
      ...expense,
      id: savedExpenses.length,
    });
    fetchRates();
    this.setState({ expense: initialExpense });
  }

  render() {
    const {
      state: {
        expense: {
          value,
          description,
          currency,
          method,
          tag,
        },
        availableMethods,
        availableTags,
      },
      props: {
        currencies,
      },
      handleInputChange,
      handleSubmitExpense,
    } = this;
    return (
      <form
        onSubmit={ (e) => e.preventDefault() }
      >
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
            onChange={ handleInputChange }
          >
            { currencies.map((coin) => (
              <option
                key={ coin }
                value={ coin }
                selected={ coin === currency }
              >
                { coin }
              </option>
            )) }
          </select>
        </label>
        <select
          name="method"
          onChange={ handleInputChange }
          data-testid="method-input"
        >
          { availableMethods.map((payment, index) => (
            <option
              key={ index }
              value={ payment }
              selected={ payment === method }
            >
              { payment }
            </option>
          ))}
        </select>
        <select
          name="tag"
          onChange={ handleInputChange }
          data-testid="tag-input"
        >
          { availableTags.map((category, index) => (
            <option
              key={ index }
              value={ category }
              selected={ category === tag }
            >
              { category }
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
        <button
          type="submit"
          onClick={ handleSubmitExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  savedExpenses: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  saveExpense: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  savedExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(actSaveExpense(expense)),
  fetchRates: () => dispatch(fetchExchangeRates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
