import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import './no-internet-connection-error.css';

const NoInternetConnectionError = ({ dataFromApp }) => {
  const { internetConnection } = dataFromApp;
  if (internetConnection) {
    return null;
  }
  return (
    <Alert
      message="No Internet Connection"
      description="Try turning on your WiFi or Mobile Data for using app."
      type="warning"
      showIcon
      closable
      className="internet-connection-error"
    />
  );
};

export default NoInternetConnectionError;

NoInternetConnectionError.defaultProps = {
  dataFromApp: {},
};

NoInternetConnectionError.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object),
};
