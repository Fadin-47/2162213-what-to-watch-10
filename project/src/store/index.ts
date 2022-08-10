import { createAPI } from '../services/api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const API = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: API,
      },
    })
});
