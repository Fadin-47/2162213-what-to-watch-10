import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { UserProcessReducer } from './user-process/user-process.reducer';
import { FilmReducer } from './films/films.reducer';
import { CommentsReducer } from './comments/comments.reducer';

export const rootReducer = combineReducers({
  [NameSpace.User]: UserProcessReducer.reducer,
  [NameSpace.Film]: FilmReducer.reducer,
  [NameSpace.Comments]: CommentsReducer.reducer,
});
