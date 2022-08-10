import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../../types/app-state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { IFilmData } from '../../types/film-data';

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

export const getSingleFilm = createAsyncThunk<IFilmData, { filmId: number }, {
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

export const getSimilar = createAsyncThunk<IFilmData[], { filmId: number }, {
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
