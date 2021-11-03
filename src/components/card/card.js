import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';
import { format } from 'date-fns';

const { Text } = Typography;

const Card = (props) => {
  const {
    original_title: originalTitle,
    overview,
    poster_path: posterPath,
    release_date: releaseDate,
  } = props.movie; /* eslint-disable-line */

  const getShortText = (string, maxLen) => {
    let newString = string.split(' ').slice(0, maxLen);
    for (let i = newString.length - 1; i > Math.floor(maxLen / 2); i--) {
      if (newString[i].endsWith('.') || newString[i].endsWith(',')) {
        newString = newString.slice(0, i + 1);
      }
    }
    newString = newString.join(' ');
    if (newString.endsWith(',') || newString.endsWith('.')) {
      newString = `${newString.slice(0, -1)}.`;
    } else {
      newString += '.';
    }
    return newString;
  };

  return (
    <div className="card">
      <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`} alt="poster" className="poster" />
      <div className="card-text">
        <h5 className="card-text-headline">{originalTitle}</h5>
        <p className="card-text-date">{format(new Date(releaseDate), 'MMMM d, yyyy')}</p>
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
