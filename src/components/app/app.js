import React from 'react';
import { debounce } from 'lodash';

import './app.css';

import Content from '../content/content';
import getMovies from '../../services/tmdb-api';

export default class App extends React.Component {

  state = {
    inputValue: '',
    data: [],
    totalResults: 0,
    loading: true,
    error: false,
    errorDetails: null,
    internetConnection: true,
    minValue: 0,
    maxValue: 6,
    currentPage: 1
  };

  componentDidMount() {
    this.renderMovies();
    this.timerId = setInterval(() => this.checkOnlineStatus(), 3000);
  }

  componentDidUpdate(prevProps, prevState) {

    const {inputValue, currentPage} = this.state;

    if (inputValue !== prevState.inputValue) {
      this.goToPage1();
      this.debouncedRenderMovies();
    }
    if (currentPage !== prevState.currentPage) {
      this.debouncedRenderMovies();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  renderMovies = () => {
      const query = this.state.inputValue || 'return';

      let n = Math.ceil(this.state.currentPage / 10);


      this.setState(() => { return {data: [], loading: true} });

      for (let i = n; i < n + 3; i++) {
        getMovies(query, i).then(
            (movies) => {
              this.setState(({ data }) => ({ data: [...data, ...movies.results], loading: false, totalResults: movies.total_results }));
            },
            (error) => {
              this.setState(() => ({ loading: false, error: true, errorDetails: error.message }));
            }
        );
      }
  };

  debouncedRenderMovies = debounce(() => this.renderMovies(), 500);

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
    this.setState(() => {return {inputValue: event.target.value}});
  };

  paginationChange = (value) => {
    this.setState(() => {

      let maxValue = value * 6;
      let minValue = maxValue - 6;

      if (maxValue > 60) {
        maxValue % 60 === 0 ? maxValue = 60 : maxValue = maxValue % 60;
        minValue = maxValue - 6;
      }
      return {currentPage: value, minValue, maxValue}
    });
  };

  goToPage1 = () => {
    this.setState({currentPage: 1});
  };

  render() {
    return (
        <Content
            dataFromApp={this.state}
            inputChange={this.inputChange}
            paginationChange={this.paginationChange}
            totalResults={this.state.totalResults}
            loading={this.state.loading}
            error={this.state.error}
            errorDetails={this.state.errorDetails}
            internetConnection={this.state.internetConnection}
            minValue={this.state.minValue}
            maxValue={this.state.maxValue}
        />
    );
  }
}
