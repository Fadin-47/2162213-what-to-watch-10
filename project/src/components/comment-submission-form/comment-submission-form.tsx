import { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react';
import { useInputValidation } from '../../hooks/use-input-validation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postComment } from '../../store/comments/comments.api-actions';
import { selectRequestPostCommentStatus } from '../../store/comments/comments.selector';
import { RequestStatus, ReviewTextLimit } from '../../const';
import { useNavigate } from 'react-router-dom';
import { setRequestPostCommentStatus } from '../../store/comments/comments.reducer';
import Loader from '../loader/loader';


function CommentSubmissionForm({filmId}: PropsWithChildren<{filmId: number}>) {
  const dispatch = useAppDispatch();
  const requestPostCommentStatus = useAppSelector(selectRequestPostCommentStatus);
  const navigate = useNavigate();

  const [rating, setRating] = useState<string>('');
  useEffect(() => {
    if (requestPostCommentStatus === RequestStatus.SUCCESS) {
      navigate(`/films/${filmId}`);
      dispatch(setRequestPostCommentStatus(RequestStatus.IDLE));
    }
  }, [dispatch, requestPostCommentStatus, filmId, navigate]);

  const handleRating = (event: ChangeEvent<HTMLInputElement>) => setRating(event.target.value);
  const handlePostReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(postComment({
      sendComment: {
        comment: reviewText.value,
        rating: +rating,
      },
      filmId: filmId
    }));
  };
  const reviewText = useInputValidation('', { isEmpty: true, minLength: ReviewTextLimit.MIN_LENGTH_REVIEW, maxLength: ReviewTextLimit.MAX_LENGTH_REVIEW});
  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            <input className="rating__input" id="star-10" type="radio" name="rating" value="10" disabled={requestPostCommentStatus === RequestStatus.LOADING} onChange={handleRating}/>
            <label className="rating__label" htmlFor="star-10">Rating 10</label>

            <input className="rating__input" id="star-9" type="radio" name="rating" value="9" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-9">Rating 9</label>

            <input className="rating__input" id="star-8" type="radio" name="rating" value="8" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-8">Rating 8</label>

            <input className="rating__input" id="star-7" type="radio" name="rating" value="7" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-7">Rating 7</label>

            <input className="rating__input" id="star-6" type="radio" name="rating" value="6" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-6">Rating 6</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-5">Rating 5</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={handleRating} disabled={requestPostCommentStatus === RequestStatus.LOADING}/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>
          </div>
        </div>
        <div>
          {reviewText.maxLength && reviewText.isDirty && <div>Превышенно количество символов. Максимум {ReviewTextLimit.MAX_LENGTH_REVIEW}</div>}
          {reviewText.minLength && reviewText.isDirty && <div>Не достаточное количество символов. Минимум {ReviewTextLimit.MIN_LENGTH_REVIEW}</div>}
          {requestPostCommentStatus === RequestStatus.ERROR && (
            <div>Ошибка оправки запроса</div>
          )}
        </div>
        <div className="add-review__text">
          <textarea
            disabled={requestPostCommentStatus === RequestStatus.LOADING}
            onChange={(e) => reviewText.onChange(e)}
            onBlur={(e) => reviewText.onBlur(e)}
            value={reviewText.value}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              disabled={!reviewText.inputValid || rating === ''}
              onClick={(e) => handlePostReview(e)}
            >
              Post
            </button>
          </div>
        </div>
      </form>
      {requestPostCommentStatus === RequestStatus.LOADING && (
        <div style={{ display: 'flex', justifyItems: 'center', marginTop: 16}}>
          <Loader/>
        </div>
      )}
    </div>
  );
}

export default CommentSubmissionForm;
