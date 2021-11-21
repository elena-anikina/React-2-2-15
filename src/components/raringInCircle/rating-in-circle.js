import React from 'react';
import PropTypes from 'prop-types';

import './rating-in-circle.css';

const RatingInCircle = ({ rating }) => {
  if (rating === 0) return null;
  let color;
  if (rating > 0 && rating < 3) {
    color = '#E90000';
  }
  if (rating >= 3 && rating <= 5) {
    color = '#E97E00';
  }
  if (rating > 5 && rating <= 7) {
    color = '#E9D100';
  }
  if (rating > 7) {
    color = '#66E900';
  }

  return (
    <div className="icon-rating">
      <div className="icon-circle-rating">
        <span className="rating">{rating}</span>
        <svg
          focusable="false"
          data-prefix="far"
          data-icon="circle"
          className="icon-circle svg-inline--fa fa-circle fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill={color}
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
          />
        </svg>
      </div>
    </div>
  );
};

export default RatingInCircle;

RatingInCircle.defaultProps = {
  rating: 0,
};

RatingInCircle.propTypes = {
  rating: PropTypes.number,
};
