import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentData, ISendComment } from '../../types/comment-data';
import { AppDispatch, AppState } from '../../types/app-state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';

export const getComments = createAsyncThunk<ICommentData[], {filmId: number},{
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'comments/getComments',
  async ({ filmId }, {dispatch, extra: API}) => {
    const { data } = await API.get<ICommentData[]>(`${APIRoute.Comments}/${filmId}`);
    return data;
  }
);

export const postComment = createAsyncThunk<ICommentData[], {sendComment: ISendComment, filmId: number }, {
  dispatch: AppDispatch,
  state: AppState,
  extra: AxiosInstance,
}>(
  'comments/postComment',
  async ({sendComment ,filmId}, {dispatch, extra: API}) => {
    const { data } = await API.post<ICommentData[]>(`${APIRoute.Comments}/${filmId}`, sendComment);
    return data;
  }
);
