import React from 'react';
import { Col } from 'antd';
import Card from '../card/card';

import './cards-all.css';

const CardsAll = ({ data, minValue, maxValue }) => {

    if (data.length === 0) {
        return (
            <Col span={24}>No movies found.</Col>
        );
    }

    const data4 = data.slice(minValue, maxValue);

    return data4.map((movie) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={12} key={movie.id}>
            <Card movie={movie} />
        </Col>
    ));
}

export default CardsAll;
