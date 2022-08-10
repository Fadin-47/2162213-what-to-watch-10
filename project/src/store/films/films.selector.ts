import { AppState } from '../../types/app-state';
import { NameSpace, RequestStatus } from '../../const';
import { IFilmData } from '../../types/film-data';

export const selectFilms = (state: AppState): IFilmData[] => state[NameSpace.Film].films;
export const selectRequestGetFilmsStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetFilmsStatus;
export const selectSingleFilm = (state: AppState): IFilmData | null => state[NameSpace.Film].singleFilm;
export const selectRequestGetSingleFilmsStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetSingleFilmsStatus;
export const selectSimilar = (state: AppState): IFilmData[] => state[NameSpace.Film].similar;
export const selectRequestGetSimilarStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetSimilarStatus;
export const selectPromo = (state: AppState): IFilmData | null => state[NameSpace.Film].promo;
export const selectRequestGetPromoStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetPromoStatus;
