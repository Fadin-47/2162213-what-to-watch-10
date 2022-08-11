import { AppState } from '../../types/app-state';
import { NameSpace, RequestStatus } from '../../const';
import { IFilmData } from '../../types/film-data';
import { createSelector } from '@reduxjs/toolkit';

export const selectFilms = (state: AppState): IFilmData[] => state[NameSpace.Film].films;
export const selectRequestGetFilmsStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetFilmsStatus;
export const selectSingleFilm = (state: AppState): IFilmData | null => state[NameSpace.Film].singleFilm;
export const selectRequestGetSingleFilmsStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetSingleFilmsStatus;
export const selectSimilar = (state: AppState): IFilmData[] => state[NameSpace.Film].similar;
export const selectRequestGetSimilarStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetSimilarStatus;
export const selectPromo = (state: AppState): IFilmData | null => state[NameSpace.Film].promo;
export const selectRequestGetPromoStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetPromoStatus;
export const selectFavorites = (state: AppState): IFilmData[] => state[NameSpace.Film].favorites;
export const selectRequestGetFavoriteStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestGetFavoriteStatus;
export const selectRequestPostFavoriteStatus = (state: AppState): RequestStatus => state[NameSpace.Film].requestPostFavoriteStatus;
export const selectAllGenres = (state: AppState): string[] => {
  const allGenre = new Set<string>();
  for (const genre of state[NameSpace.Film].films) {
    allGenre.add(genre.genre);
  }
  return Array.from(allGenre);
};
export const selectGenre = (state: AppState): string| null => state[NameSpace.Film].selectGenre;

export const filterGenreFilms = createSelector(
  [selectGenre, selectFilms],
  (genre, allFilms) => {
    let filtredFilm: IFilmData[];
    if (genre) {

      filtredFilm = allFilms.filter((film) => film.genre === genre);
      return filtredFilm;
    } else {
      return allFilms;
    }
  }
);
