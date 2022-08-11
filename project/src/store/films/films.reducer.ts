import { IFilmsStore } from '../../types/app-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { getFavorite, getFilms, getPromo, getSimilar, getSingleFilm, postFavorite } from './films.api-actions';


const initialState: IFilmsStore = {
  films: [],
  requestGetFilmsStatus: RequestStatus.IDLE,
  singleFilm: null,
  requestGetSingleFilmsStatus: RequestStatus.IDLE,
  similar: [],
  requestGetSimilarStatus: RequestStatus.IDLE,
  promo: null,
  requestGetPromoStatus: RequestStatus.IDLE,
  favorites: [],
  requestGetFavoriteStatus: RequestStatus.IDLE,
  requestPostFavoriteStatus: RequestStatus.IDLE,
  selectGenre: null,
};

export const FilmReducer = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setChangeGenre: (state: IFilmsStore, action: PayloadAction<string | null>) => {
      state.selectGenre = action.payload;
    },
  },
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
      })
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
        if (state.films) {
          for (const [index, film] of state.films.entries()) {
            if (film.id === action.payload.id) {
              state.films[index] = action.payload;
            }
          }
        }
        if (state.promo) {
          if (state.promo.id === action.payload.id) {
            state.promo = action.payload;
          }
        }
      })
      .addCase(postFavorite.rejected, (state) => {
        state.requestPostFavoriteStatus = RequestStatus.ERROR;
      });
  }
});

export const { setChangeGenre } = FilmReducer.actions;
