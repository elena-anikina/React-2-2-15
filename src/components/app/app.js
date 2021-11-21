/* eslint-disable */
import React from 'react';

import './app.css';

import { debounce } from 'lodash';
import Content from '../content/content';
import TmdbApi from '../../services/tmdb-api';
import { TmdbServiceProvider } from '../tmdb-context/tmdb-context';

export default class App extends React.Component {
  tmdbApi = new TmdbApi();

  state = {
    inputValue: '',
    data: [],
    totalResults: 0,
    loading: true,
    error: false,
    internetConnection: true,
    minValue: 0,
    maxValue: 6,
    currentPage: 1,
    guestSessionId: null,
    ratedMovies: [],
    genres: [],
  };

  debouncedRenderMovies = debounce(() => this.renderMovies(), 500);

  componentDidMount() {
    this.getGuestSession();
    this.getAllGenres();
    this.renderMovies();
    this.timerId = setInterval(() => this.checkOnlineStatus(), 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, currentPage } = this.state;

    if (inputValue !== prevState.inputValue) {
      this.goToPage1();
      this.debouncedRenderMovies();
    }
    if (currentPage !== prevState.currentPage) {
      this.setState({ loading: true });
      this.debouncedRenderMovies();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  renderMovies = () => {
    const { inputValue, currentPage } = this.state;

    this.setState(() => ({ data: [], loading: true }));

    const query = inputValue || 'return';

    const n = Math.ceil(currentPage / 10);

    for (let i = n; i < n + 3; i++) {
      this.tmdbApi.getMovies(query, i).then(
        (movies) => {
          this.setState(({ data }) => ({
            data: [...data, ...movies.results],
            loading: false,
            totalResults: movies.total_results,
          }));
        },
        (error) => {
          this.setState(() => ({ loading: false, error: true }));
        }
      );
    }
  };

  checkOnlineStatus = async () => {
    try {
      const online = await fetch('../../1pixel.png');
      if (online.status >= 200 && online.status < 300) {
        this.setState(() => ({ internetConnection: true }));
      }
    } catch (error) {
      this.setState(() => ({ internetConnection: false }));
    }
  };

  inputChange = (event) => {
    this.setState(() => ({ inputValue: event.target.value }));
  };

  paginationChange = (value) => {
    this.setState(() => {
      let maxValue = value * 6;
      let minValue = maxValue - 6;

      if (maxValue > 60) {
        maxValue % 60 === 0 ? (maxValue = 60) : (maxValue %= 60);
        minValue = maxValue - 6;
      }
      return { currentPage: value, minValue, maxValue };
    });
  };

  goToPage1 = () => {
    this.setState({ currentPage: 1 });
  };

  getGuestSession = async () => {
    await this.tmdbApi.getGuestSession().then(
      (body) => {
        this.setState({ guestSessionId: body.guest_session_id });
      },
      (error) => {
        this.setState({ loading: false, error: true });
      }
    );
  };

  getAllGenres = async () => {
    await this.tmdbApi.getAllGenres().then(
      (body) => {
        this.setState({ genres: body.genres });
      },
      (error) => {
        this.setState({ loading: false, error: true });
      }
    );
  };

  getRatedMovies = async (activeKey) => {
    if (activeKey === '2') {
      const { guestSessionId } = this.state;
      this.setState({ loading: true, ratedMovies: [] });
      await this.tmdbApi
        .getRatedMovies(guestSessionId)
        .then((body) => body.results)
        .then((ratedMovies) => {
          this.setState({ ratedMovies, loading: false });
        });
    }
  };

  render() {
    const { genres } = this.state;
    return (
      <TmdbServiceProvider value={genres}>
        <Content
          appState={this.state}
          inputChange={this.inputChange}
          paginationChange={this.paginationChange}
          getRatedMovies={this.getRatedMovies}
        />
      </TmdbServiceProvider>
    );
  }
}
