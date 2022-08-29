import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../../types/app-state';
import { AxiosInstance } from 'axios';
import { IAuthData } from '../../types/auth-data';
import { IUserData } from '../../types/user-data';
import { APIRoute } from '../../const';
import { dropToken, saveToken } from '../../services/token';

export const checkAuthAction = createAsyncThunk<IUserData, undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: API}) => {
    const {data} = await API.get<IUserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<IUserData, IAuthData, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: API}) => {
    const {data} = await API.post<IUserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logOutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'user/logout',
  async (_agr, {dispatch, extra: API}) => {
    await API.delete(APIRoute.Logout);
    dropToken();
  },
);
