import React from 'react';
import PropTypes from 'prop-types';

import './card.css';

import { Rate } from 'antd';
import { format } from 'date-fns';
import RatingInCircle from '../raringInCircle/rating-in-circle';
import Genres from '../genres/genres';
import TmdbApi from '../../services/tmdb-api';
import getShortText from '../../helper/get-short-text-func';
import noPoster from '../../helper/no-poster.jpg';

export default class Card extends React.Component {
  tmdbApi = new TmdbApi();

  state = {
    rating: 0,
    isRated: null,
  };

  componentDidMount() {
    const { isRated } = this.props;
    this.setState({ isRated });
    this.checkRatedMoviesArr();
  }

  componentDidUpdate(prevProps, prevState) {
    const { rating, isRated } = this.state;

    if (rating !== prevState.rating && rating > 0) {
      this.rateMovie();
    }

    if (rating !== prevState.rating && rating === 0 && isRated === false) {
      this.deleteRating();
    }

    if (rating !== prevState.rating && rating === 0 && isRated === true) {
      const { getRatedMovies } = this.props;

      this.deleteRating().then(() => {
        getRatedMovies('2');
      });
    }
  }

  onChangeRate = (value) => {
    this.setState(() => ({ rating: value }));
  };

  rateMovie = async () => {
    const { guestSessionId, movie } = this.props;
    const { rating } = this.state;
    const { id } = movie;

    await this.tmdbApi
      .rateMovie(id, guestSessionId, rating)
      .then((response) => response.json())
      .then((body) => body);
  };

  deleteRating = async () => {
    const { guestSessionId, movie } = this.props;
    const { id } = movie;

    await this.tmdbApi
      .deleteMovieRating(id, guestSessionId)
      .then((response) => response.json())
      .then((body) => body);
  };

  checkRatedMoviesArr = () => {
    const { ratedMovies, movie } = this.props;
    const { id } = movie;
    ratedMovies.forEach((ratedMovie) => {
      if (id === ratedMovie.id) {
        this.setState({ rating: ratedMovie.rating });
      }
    });
  };

  render() {
    const { movie } = this.props;
    const {
      original_title: originalTitle,
      overview,
      poster_path: posterPath,
      release_date: releaseDate,
      genre_ids: genreIds,
    } = movie;
    const { rating } = this.state;

    const posterImg = (
      <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`} className="poster" alt="poster" />
    );
    const noPosterImg = <img src={noPoster} className="poster" alt="poster" />;
    const poster = posterPath ? posterImg : noPosterImg;

    const renderDate = releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : null;
    const stars = <Rate count={10} allowHalf onChange={this.onChangeRate} value={rating} />;

    return (
      <div className="card">
        {poster}
        <div className="card-text">
          <h5 className="card-text-headline">{originalTitle}</h5>
          <p className="card-text-date">{renderDate}</p>
          <Genres genreIds={genreIds} />
          <p>{getShortText(overview, 28)}</p>
          {stars}
          <RatingInCircle rating={rating} />
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  movie: {
    original_title: 'Movie Title',
    overview: 'Movie overview',
    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/hba8zREJpP1AYhaXgb2oJLQeO0K.jpg',
    release_date: '2021-11-02',
  },
  guestSessionId: 'string',
  ratedMovies: [],
  isRated: false,
};

Card.propTypes = {
  getRatedMovies: PropTypes.func.isRequired,
  movie: PropTypes.instanceOf(Object),
  guestSessionId: PropTypes.string,
  ratedMovies: PropTypes.instanceOf(Array),
  isRated: PropTypes.bool,
};
