import React from 'react';
import PropTypes from 'prop-types';

import './error.css';
import { Alert } from 'antd';

const Error = ({ dataFromApp }) => {
  const { error } = dataFromApp;

  if (!error) return null;
  const errorText = `BOOM! Something has gone wrong.
                       We will try to fix it as soon as possible.`;
  return <Alert message="Error" description={errorText} type="error" showIcon className="error" />;
};

export default Error;

Error.defaultProps = {
  dataFromApp: {
    error: false,
  },
};

Error.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object),
};
