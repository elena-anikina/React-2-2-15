import React from 'react';
import PropTypes from 'prop-types';

import './error.css';
import { Alert } from 'antd';

const Error = ({ errorDetails }) => {
  const errorText = `BOOM! Something has gone wrong.
                       We will try to fix it as soon as possible.
                       The response status is ${errorDetails}.`;
  return <Alert message="Error" description={errorText} type="error" showIcon className="error" />;
};

export default Error;

Error.defaultProps = {
  errorDetails: 'response status',
};

Error.propTypes = {
  errorDetails: PropTypes.string,
};
