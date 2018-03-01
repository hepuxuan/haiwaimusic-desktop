import createHashHistory from 'history/createBrowserHistory';

const history = createHashHistory({
  basename: '',
  forceRefresh: false,
});

window.browserHistory = history;

export default history;