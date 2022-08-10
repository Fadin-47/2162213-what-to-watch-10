import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const';
import { IFilmData } from './film-data';
import { ICommentData } from './comment-data';
import { IUserData } from './user-data';


export interface IUserProcessStore {
  authorizationStatus: AuthorizationStatus,
  userData: IUserData | null,
}

export interface IFilmsStore {
  films: IFilmData[],
  requestGetFilmsStatus: RequestStatus,
  singleFilm: IFilmData | null,
  requestGetSingleFilmsStatus: RequestStatus,
  similar: IFilmData[],
  requestGetSimilarStatus: RequestStatus,
  promo: IFilmData | null,
  requestGetPromoStatus: RequestStatus,
}

export interface IFavoriteStore {
  favorites: IFilmData[],
  requestGetFavoriteStatus: RequestStatus,
  requestPostFavoriteStatus: RequestStatus,
}

export interface ICommentStore {
  comments: ICommentData[],
  requestGetCommentsStatus: RequestStatus,
  requestPostCommentStatus: RequestStatus,
}

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
