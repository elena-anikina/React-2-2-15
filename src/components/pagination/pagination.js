import React from 'react';
import './pagination.css';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationNav = ({ dataFromApp, paginationChange }) => {
  const { data, totalResults, currentPage, loading, error } = dataFromApp;

  if (loading || error || data.length < 6) {
    return null;
  }

  const pagination = (
    <Pagination
      defaultCurrent={currentPage}
      defaultPageSize={6}
      onChange={paginationChange}
      total={totalResults}
      showSizeChanger={false}
    />
  );

  return <div className="pagination-wrap">{data.length > 6 ? pagination : null}</div>;
};

PaginationNav.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object).isRequired,
  paginationChange: PropTypes.func.isRequired,
};

export default PaginationNav;
