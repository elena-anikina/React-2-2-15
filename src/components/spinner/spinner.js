import React from 'react';
import PropTypes from 'prop-types';

import './spinner.css';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({ dataFromApp }) => {
  const { loading } = dataFromApp;

  if (!loading) return null;
  const antIcon = <LoadingOutlined style={{ fontSize: '5em' }} spin />;
  return (
    <div className="spinner-rated">
      <Spin indicator={antIcon} className="spinner" />;
    </div>
  );
};

export default Spinner;

Spinner.defaultProps = {
  dataFromApp: {
    loading: false,
  },
};

Spinner.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object),
};
