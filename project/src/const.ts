export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Comments = 'COMMENTS',
  Film = 'FILM',
  User = 'USER',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum RequestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum FavoriteAction {
  REMOTE = 0,
  ADD = 1,
}

export enum ReviewTextLimit {
  MAX_LENGTH_REVIEW = 400,
  MIN_LENGTH_REVIEW = 50,
}

export enum TabNumericName {
  ZERO = 0,
  FIRST = 1,
  SECOND = 2,
}

export const tabPanelNames = ['Overview', 'Details', 'Reviews'];

export enum NameSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export const TIME_RESET_TOASTS = 3000;

export enum ShowMoreParams {
  DEFAULT = 0,
  START_VIEW = 7,
  HOW_ADD = 8,
}

export const COUNT_MORE_LIKE_THIS = 4;
