import React from 'react';
import './pagination.css';
import {Pagination} from "antd";

const Pagination_ = ({dataFromApp, paginationChange}) => {

    const {data, totalResults, currentPage} =  dataFromApp;

    const pagination = <Pagination
                defaultCurrent={currentPage}
                defaultPageSize={6}
                onChange={paginationChange}
                total={totalResults}
                showSizeChanger={false} />;

    return (data.length > 6) ? pagination : null;
};

export default Pagination_;