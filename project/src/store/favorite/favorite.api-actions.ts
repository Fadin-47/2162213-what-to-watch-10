import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFavoriteRequest, IFilmData } from '../../types/film-data';
import { AppDispatch, AppState } from '../../types/app-state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';

export const getFavorite = createAsyncThunk<IFilmData[], undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'favorite/getFavorite',
  async (_arg, {dispatch, extra: API}) => {
    const { data } = await API.get<IFilmData[]>(APIRoute.Favorite);
    return data;
  }
);

export const postFavorite = createAsyncThunk<IFilmData, IFavoriteRequest, {
    dispatch: AppDispatch,
    state: AppState,
    extra: AxiosInstance,
  }>(
    'favorite/createAsyncThunk',
    async ({filmId, status}, {dispatch, extra: API}) => {
      const { data } = await API.post<IFilmData>(`${APIRoute.Favorite}/${filmId}/${status}`);
      return data;
    }
  );
