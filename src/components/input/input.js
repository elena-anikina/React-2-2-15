import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

import { Input } from 'antd';

const InputSearch = ({ dataFromApp, inputChange }) => {
  const { inputValue } = dataFromApp;

  return (
    <Input placeholder="Type to search..." value={inputValue} onChange={inputChange} autoFocus className="input" />
  );
};

export default InputSearch;

InputSearch.defaultProps = {
  dataFromApp: {},
  inputChange: () => {},
};

InputSearch.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object),
  inputChange: PropTypes.func,
};
