import { IFavoriteStore } from '../../types/app-state';
import { NameSpace, RequestStatus } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { getFavorite, postFavorite } from './favorite.api-actions';


const initialState: IFavoriteStore = {
  favorites: [],
  requestGetFavoriteStatus: RequestStatus.IDLE,
  requestPostFavoriteStatus: RequestStatus.IDLE,
};


export const FavoriteReducer = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavorite.pending, (state) => {
        state.requestGetFavoriteStatus = RequestStatus.LOADING;
      })
      .addCase(getFavorite.fulfilled, (state, action) => {
        state.requestGetFavoriteStatus = RequestStatus.SUCCESS;
        state.favorites = action.payload;
      })
      .addCase(getFavorite.rejected, (state) => {
        state.requestGetFavoriteStatus = RequestStatus.ERROR;
      })
      .addCase(postFavorite.pending, (state) => {
        state.requestPostFavoriteStatus = RequestStatus.LOADING;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        state.requestPostFavoriteStatus = RequestStatus.SUCCESS;
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((film) => film.id !== action.payload.id);
        }
      })
      .addCase(postFavorite.rejected, (state) => {
        state.requestPostFavoriteStatus = RequestStatus.ERROR;
      });
  }
});
