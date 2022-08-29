import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSubmissionFormComponent from '../../components/comment-submission-form/comment-submission-form.component';
import { getSingleFilm } from '../../store/films/films.api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectSingleFilm } from '../../store/films/films.selector';
import HeaderComponent from '../../components/header/header.component';

function AddReviewPage() {
  const params = useParams();
  const dispacth = useAppDispatch();
  const singleFilm = useAppSelector(selectSingleFilm);

  useEffect(() => {
    if (params.id) {
      dispacth(getSingleFilm({filmId: params.id}));
    }
  },[dispacth, params.id]);

  return (
    <Fragment>
      <div className="visually-hidden">
      </div>
      {singleFilm && (
        <section className="film-card film-card--full">
          <div className="film-card__header">
            <div className="film-card__bg">
              <img src={singleFilm.posterImage} alt={singleFilm.name}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <HeaderComponent styleHeader={'page-header film-card__head'}/>

            <div className="film-card__poster film-card__poster--small">
              <img
                src={singleFilm.previewImage}
                alt={singleFilm.name}
                width="218"
                height="327"
              />
            </div>
          </div>
          <CommentSubmissionFormComponent filmId={singleFilm.id}/>

        </section>
      )}
    </Fragment>
  );
}
export default AddReviewPage;
