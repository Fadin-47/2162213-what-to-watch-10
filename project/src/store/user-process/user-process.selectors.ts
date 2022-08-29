import { AppState } from '../../types/app-state';
import { AuthorizationStatus, NameSpace } from '../../const';
import { IUserData } from '../../types/user-data';
import { IToasts } from '../../components/toasts/toasts.component';

export const selectAuthorizationStatus = (state: AppState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectUserData = (state: AppState): IUserData | null => state[NameSpace.User].userData;
export const selectRequestError = (state: AppState): IToasts | null => state[NameSpace.User].requestError;
