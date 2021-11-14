import React from 'react';
import { Alert } from 'antd';

import './no-internet-connection-error.css';

const NoInternetConnectionError = () => {
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
}

export default NoInternetConnectionError;
