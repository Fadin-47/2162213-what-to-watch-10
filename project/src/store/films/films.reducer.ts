import { IFilmsStore } from '../../types/app-state';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { getFilms, getPromo, getSimilar, getSingleFilm } from './films.api-actions';


const initialState: IFilmsStore = {
  films: [],
  requestGetFilmsStatus: RequestStatus.IDLE,
  singleFilm: null,
  requestGetSingleFilmsStatus: RequestStatus.IDLE,
  similar: [],
  requestGetSimilarStatus: RequestStatus.IDLE,
  promo: null,
  requestGetPromoStatus: RequestStatus.IDLE,
};

export const FilmReducer = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFilms.pending, (state) =>{
        state.requestGetFilmsStatus = RequestStatus.LOADING;
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.requestGetFilmsStatus = RequestStatus.SUCCESS;
        state.films = action.payload;
      })
      .addCase(getFilms.rejected, (state) => {
        state.requestGetFilmsStatus = RequestStatus.ERROR;
      })
      .addCase(getSingleFilm.pending, (state) =>{
        state.requestGetSingleFilmsStatus = RequestStatus.LOADING;
      })
      .addCase(getSingleFilm.fulfilled, (state, action) => {
        state.requestGetSingleFilmsStatus = RequestStatus.SUCCESS;
        state.singleFilm = action.payload;
      })
      .addCase(getSingleFilm.rejected, (state) => {
        state.requestGetSingleFilmsStatus = RequestStatus.ERROR;
      })
      .addCase(getSimilar.pending, (state) =>{
        state.requestGetSimilarStatus = RequestStatus.LOADING;
      })
      .addCase(getSimilar.fulfilled, (state, action) => {
        state.requestGetSimilarStatus = RequestStatus.SUCCESS;
        state.similar = action.payload;
      })
      .addCase(getSimilar.rejected, (state) => {
        state.requestGetPromoStatus = RequestStatus.ERROR;
      })
      .addCase(getPromo.pending, (state) =>{
        state.requestGetPromoStatus = RequestStatus.LOADING;
      })
      .addCase(getPromo.fulfilled, (state, action) => {
        state.requestGetPromoStatus = RequestStatus.SUCCESS;
        state.promo = action.payload;
      })
      .addCase(getPromo.rejected, (state) => {
        state.requestGetPromoStatus = RequestStatus.ERROR;
      });
  }
});
