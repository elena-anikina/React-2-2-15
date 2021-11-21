import React from 'react';
import PropTypes from 'prop-types';

import './genres.css';

import { Typography } from 'antd';

import { TmdbServiceConsumer } from '../tmdb-context/tmdb-context';

const { Text } = Typography;

const Genres = ({ genreIds }) => (
  <TmdbServiceConsumer>
    {(genres) => {
      const genresForThisCard = genres.filter((genre) => genreIds.includes(genre.id));
      return (
        <p>
          {genresForThisCard.map((genre) => (
            <Text code key={genre.id}>
              {genre.name}
            </Text>
          ))}
        </p>
      );
    }}
  </TmdbServiceConsumer>
);

export default Genres;

Genres.defaultProps = {
  genreIds: [],
};

Genres.propTypes = {
  genreIds: PropTypes.instanceOf(Array),
};
