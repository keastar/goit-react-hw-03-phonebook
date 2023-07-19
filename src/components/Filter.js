import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const Filter = ({ value, onChange }) => (
  <label className={css.contactList_item_label}>
    Фильтр по имени:{' '}
    <input type="text" name="name" value={value} onChange={onChange} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
