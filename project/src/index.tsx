import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction } from './store/user-process/user-process.api-actions';
import Toasts from './components/toasts/toasts';

store.dispatch(checkAuthAction());
const selectRequestError = store.getState().USER.requestError;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      {selectRequestError && (
        <Toasts severity={selectRequestError.severity} message={selectRequestError.message} />
      )}
    </Provider>
  </React.StrictMode>,
);
