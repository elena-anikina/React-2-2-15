import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'antd';
import Card from '../card/card';

export default class RatedMovies extends React.Component {
  render() {
    const { dataFromApp, getRatedMovies } = this.props;
    const { ratedMovies, guestSessionId, loading } = dataFromApp;

    if (ratedMovies.length === 0 && !loading) {
      return <Col span={24}>No movies rated.</Col>;
    }

    return ratedMovies.map((movie) => (
      <Col xs={24} sm={24} md={12} lg={12} xl={12} key={movie.id}>
        <Card
          movie={movie}
          guestSessionId={guestSessionId}
          getRatedMovies={getRatedMovies}
          ratedMovies={ratedMovies}
          isRated
        />
      </Col>
    ));
  }
}

RatedMovies.defaultProps = {
  dataFromApp: {},
  getRatedMovies: () => {},
};

RatedMovies.propTypes = {
  dataFromApp: PropTypes.instanceOf(Object),
  getRatedMovies: PropTypes.func,
};
