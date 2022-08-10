import { AppState } from '../../types/app-state';
import { ICommentData } from '../../types/comment-data';
import { NameSpace, RequestStatus } from '../../const';

export const selectComments = (state: AppState): ICommentData[] => state[NameSpace.Comments].comments;
export const selectRequestGetCommentsStatus = (state: AppState): RequestStatus => state[NameSpace.Comments].requestGetCommentsStatus;
export const selectRequestPostCommentStatus = (state: AppState): RequestStatus => state[NameSpace.Comments].requestPostCommentStatus;
