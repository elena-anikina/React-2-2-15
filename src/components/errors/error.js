import React from 'react';

import './error.css';
import { Alert } from 'antd';

const Error = () => {
  const errorText = `BOOM! Something has gone wrong. We will try to fix it as soon as possible.`;

  return <Alert message="Error" description={errorText} type="error" showIcon className="error" />;
};

export default Error;
