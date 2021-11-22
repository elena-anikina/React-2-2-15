import React from 'react';
import PropTypes from 'prop-types';

import './content.css';

import { Row, Tabs } from 'antd';
import NoInternetConnectionError from '../errors/no-internet-connection-error';
import Error from '../errors/error';
import Spinner from '../spinner/spinner';
import CardsAll from '../cards-all/cards-all';
import InputSearch from '../input/input';
import PaginationNav from '../pagination/pagination';
import RatedMovies from '../ratedMovies/ratedMovies';

const { TabPane } = Tabs;

const Content = ({ appState, inputChange, paginationChange, getRatedMovies }) => {
  const { error } = appState;

  if (error) {
    return <Error />;
  }

  return (
    <div className="main">
      <NoInternetConnectionError dataFromApp={appState} />

      <Tabs defaultActiveKey="1" centered onChange={getRatedMovies}>
        <TabPane tab="Search" key="1">
          <InputSearch dataFromApp={appState} inputChange={inputChange} />
          <Row gutter={[16, 16]} justify="center">
            <Spinner dataFromApp={appState} />
            <CardsAll dataFromApp={appState} getRatedMovies={getRatedMovies} />
            <PaginationNav dataFromApp={appState} paginationChange={paginationChange} />
          </Row>
        </TabPane>

        <TabPane tab="Rated" key="2">
          <Row gutter={[16, 16]} justify="space-between">
            <Spinner dataFromApp={appState} />
            <RatedMovies dataFromApp={appState} getRatedMovies={getRatedMovies} />
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Content;

Content.defaultProps = {
  appState: {},
  inputChange: () => {},
  paginationChange: () => {},
  getRatedMovies: () => {},
};

Content.propTypes = {
  appState: PropTypes.instanceOf(Object),
  inputChange: PropTypes.func,
  paginationChange: PropTypes.func,
  getRatedMovies: PropTypes.func,
};
