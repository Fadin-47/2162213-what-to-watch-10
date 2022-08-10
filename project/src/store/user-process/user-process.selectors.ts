import { AppState } from '../../types/app-state';
import { AuthorizationStatus, NameSpace } from '../../const';
import { IUserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: AppState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: AppState): IUserData | null => state[NameSpace.User].userData;
