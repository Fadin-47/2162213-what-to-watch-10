import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {FILMS, HEAD_FILM} from './mocks/films';
import { USER } from './mocks/user';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/user-process/user-process.api-actions';

store.dispatch(checkAuthAction);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        headFilm={HEAD_FILM}
        filmCard={FILMS}
        user={USER}
      />
    </Provider>
  </React.StrictMode>,
);
