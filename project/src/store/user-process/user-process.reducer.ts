import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { IUserProcessStore } from '../../types/app-state';
import { checkAuthAction, loginAction, logOutAction } from './user-process.api-actions';
import { IToasts } from '../../types/components-data';

const initialState: IUserProcessStore = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  requestError: null
};

export const UserProcessReducer = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setRequestError: (state: IUserProcessStore, action: PayloadAction<IToasts | null>) => {
      state.requestError = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state,action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      });
  },
});

export const { setRequestError } = UserProcessReducer.actions;
