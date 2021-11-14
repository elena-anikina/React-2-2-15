import React from 'react';
import PropTypes from 'prop-types';

import './card.css';
import { Typography } from 'antd';
import { format } from 'date-fns';
import getShortText from '../../services/get-short-text-func';

const { Text } = Typography;

const Card = (props) => {
  const {
    original_title: originalTitle,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
  } = props.movie; /* eslint-disable-line */

  const posterUrl = `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
  const posterImg = posterPath ? <img src={posterUrl} alt="poster" className="poster" /> : null;

  const renderDate =  releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : null;

  return (
    <div className="card">
      {posterImg}
      <div className="card-text">
        <h5 className="card-text-headline">{originalTitle}</h5>
        <p className="card-text-date">{renderDate}</p>
        <p>
          <Text code>Action</Text>
          <Text code>Drama</Text>
        </p>
        <p>{getShortText(overview, 28)}</p>
      </div>
    </div>
  );
};

export default Card;

Card.defaultProps = {
  movie: {
    original_title: 'Movie Title',
    overview: 'Movie overview',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/hba8zREJpP1AYhaXgb2oJLQeO0K.jpg',
    release_date: '2021-11-02',
  },
};

Card.propTypes = {
  movie: PropTypes.instanceOf(Object),
};
