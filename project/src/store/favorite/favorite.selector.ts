import { AppState } from '../../types/app-state';
import { IFilmData } from '../../types/film-data';
import { NameSpace, RequestStatus } from '../../const';

export const selectFavorites = (state: AppState): IFilmData[] => state[NameSpace.Favorite].favorites;
export const selectRequestGetFavoriteStatus = (state: AppState): RequestStatus => state[NameSpace.Favorite].requestGetFavoriteStatus;
export const selectRequestPostFavoriteStatus = (state: AppState): RequestStatus => state[NameSpace.Favorite].requestPostFavoriteStatus;
