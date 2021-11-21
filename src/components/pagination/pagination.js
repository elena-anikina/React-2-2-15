import React from 'react';
import './pagination.css';
import { Pagination } from 'antd';

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

  return data.length > 6 ? pagination : null;
};

export default PaginationNav;
