import { AppState } from '../../types/app-state';
import { AuthorizationStatus, NameSpace } from '../../const';
import { IUserData } from '../../types/user-data';

export const selectAuthorizationStatus = (state: AppState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectUserData = (state: AppState): IUserData | null => state[NameSpace.User].userData;
