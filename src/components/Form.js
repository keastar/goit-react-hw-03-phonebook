import { Component } from 'react';
import css from './Form.module.css';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    return (
      <>
        <h3>Phonebook</h3>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <label className={css.label}>
            Name:
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              className={css.label_input}
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label className={css.label}>
            tel:
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
              className={css.label_input}
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
