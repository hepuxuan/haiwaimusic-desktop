import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import './history';
import App from './App';
import Store from './store';
import { getPlayList } from './utils';

const playList = getPlayList();
const store = new Store({
  playList,
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('main'),
);
