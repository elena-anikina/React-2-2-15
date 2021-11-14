import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

import './index.css';
import 'antd/dist/antd.css';

/*
fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=46518e6552b1fc11adce2922be39b971&language=en-US&query=madahi&page=1&include_adult=false`
)
    .then((response) => response.json())
    .then((body) => console.log(body));

 */

ReactDOM.render(<App />, document.getElementById('root'));


