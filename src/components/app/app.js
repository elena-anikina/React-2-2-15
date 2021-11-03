import React from 'react'
import { Col, Row } from 'antd'
import Card from '../card/card'

import getMovies from '../../services/tmdb-api'

export default class App extends React.Component {
  state = {
    data: [],
  }

  constructor(props) {
    super(props);
    this.updateMovies()
  }

  updateMovies() {
    getMovies().then(
      (movies) => {
        this.setState(() => {           /* eslint-disable-line */
          return { data: JSON.parse(JSON.stringify(movies)) };
        });
      },
      (error) => {
        console.error(error.message); /* eslint-disable-line */
      }
    );
  }

  render() {
    const { data } = this.state;
    const movies = data.map((movie) => (
      <Col xs={24} sm={24} md={12} lg={12} xl={12} key={movie.id}>
        <Card movie={movie} />
      </Col>
    ));
    return (
      <div className="main">
        <Row gutter={[16, 16]} justify="center">
          {movies}
        </Row>
      </div>
    );
  }
}
