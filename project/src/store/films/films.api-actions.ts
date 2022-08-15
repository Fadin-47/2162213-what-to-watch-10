import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../../types/app-state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { IFavoriteRequest, IFilmData } from '../../types/film-data';

export const getFilms = createAsyncThunk<IFilmData[], undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'films/getFilms',
  async (_agr, {dispatch, extra: API}) => {
    const {data} = await API.get<IFilmData[]>(APIRoute.Films);
    return data;
  }
);

export const getSingleFilm = createAsyncThunk<IFilmData, { filmId: string }, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'films/getSingleFilm',
  async ({filmId}, {dispatch, extra: API}) => {
    const { data } = await API.get<IFilmData>(`${APIRoute.Films}/${filmId}`);
    return data;
  }
);

export const getSimilar = createAsyncThunk<IFilmData[], { filmId: string }, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'films/getSimilar',
  async ({filmId}, {dispatch, extra: API}) => {
    const { data } = await API.get<IFilmData[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  }
);

export const getPromo = createAsyncThunk<IFilmData, undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'films/getPromo',
  async (_agr, {dispatch, extra: API}) => {
    const { data } = await API.get<IFilmData>(APIRoute.Promo);
    return data;
  }
);

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
