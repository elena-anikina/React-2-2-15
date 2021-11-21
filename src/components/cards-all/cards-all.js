import React from 'react';
import { Col } from 'antd';
import PropTypes from 'prop-types';
import Card from '../card/card';
import './cards-all.css';

const CardsAll = ({ dataFromApp, getRatedMovies }) => {
  const { data, minValue, maxValue, guestSessionId, ratedMovies, loading, error } = dataFromApp;

  if (loading || error) {
    return null;
  }
  if (data.length === 0) {
    return <Col span={24}>No movies found.</Col>;
  }
  const data6 = data.slice(minValue, maxValue);

  return data6.map((movie) => (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} key={movie.id}>
      <Card movie={movie} guestSessionId={guestSessionId} getRatedMovies={getRatedMovies} ratedMovies={ratedMovies} />
    </Col>
  ));
};

export default CardsAll;

CardsAll.defaultProps = {
  dataFromApp: {},
  getRatedMovies: () => {},
};

CardsAll.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object),
  getRatedMovies: PropTypes.func,
};
