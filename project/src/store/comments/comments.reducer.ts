import { ICommentStore } from '../../types/app-state';
import { NameSpace, RequestStatus } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { getComments, postComment } from './comments.api-actions';

const initialState: ICommentStore = {
  comments: [],
  requestGetCommentsStatus: RequestStatus.IDLE,
  requestPostCommentStatus: RequestStatus.IDLE,
};

export const CommentsReducer = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, (state) => {
        state.requestGetCommentsStatus = RequestStatus.LOADING;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.requestGetCommentsStatus = RequestStatus.SUCCESS;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.requestGetCommentsStatus = RequestStatus.ERROR;
      })
      .addCase(postComment.pending, (state) => {
        state.requestPostCommentStatus = RequestStatus.LOADING;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.requestPostCommentStatus = RequestStatus.SUCCESS;
        state.comments = action.payload;
      })
      .addCase(postComment.rejected, (state) => {
        state.requestPostCommentStatus = RequestStatus.ERROR;
      });
  },
});
