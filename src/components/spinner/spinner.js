import React from 'react';

import './spinner.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: '5em' }} spin />;
  return <Spin indicator={antIcon} className="spinner" />;
};

export default Spinner;
