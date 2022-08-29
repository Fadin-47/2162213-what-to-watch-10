import { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { IFilmData } from '../../types/film-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getComments } from '../../store/comments/comments.api-actions';
import { selectComments } from '../../store/comments/comments.selector';

export default function TabPanelMoreInfoFilmComponent({singleFilm}: PropsWithChildren<{singleFilm: IFilmData}>) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const [tab, setTab] = useState(0);
  const onChangeGenre = (chooseTab:number) => (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setTab(chooseTab);
  };
  useEffect(() => {
    dispatch(getComments({filmId: singleFilm.id}));
  }, [dispatch, singleFilm.id]);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li
            className={
              tab === 0
                ? 'film-nav__item film-nav__item--active'
                : 'film-nav__item'
            }
          >
            <a style={{ cursor: 'pointer' }} onClick={onChangeGenre(0)} className="film-nav__link">Overview</a>
          </li>
          <li
            className={
              tab === 1
                ? 'film-nav__item film-nav__item--active'
                : 'film-nav__item'
            }
          >
            <a style={{ cursor: 'pointer' }} onClick={onChangeGenre(1)} className="film-nav__link">Details</a>
          </li>
          <li
            className={
              tab === 2
                ? 'film-nav__item film-nav__item--active'
                : 'film-nav__item'
            }
          >
            <a style={{ cursor: 'pointer' }} onClick={onChangeGenre(2)} className="film-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
      {tab === 0 && (
        <Fragment>
          <div className="film-rating">
            <div className="film-rating__score">{singleFilm.rating}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">{displayRating(Number(singleFilm.rating))}</span>
              <span className="film-rating__count">{`${singleFilm.scoresCount} ratings`}</span>
            </p>
          </div>

          <div className="film-card__text">
            <p>{singleFilm.description}</p>
            <p className="film-card__director"><strong>{`Director: ${singleFilm.director}`}</strong></p>

            <p className="film-card__starring">
              <strong>
                {`Starring: ${singleFilm.starring.join(', ')} and other`}
              </strong>
            </p>
          </div>
        </Fragment>
      )}
      {tab === 1 && (
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Director</strong>
              <span className="film-card__details-value">{singleFilm.director}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Starring</strong>
              {singleFilm.starring.map((star, index) => (
                <span key={star} className="film-card__details-value">
                  {star}{index !== singleFilm.starring.length - 1 ? ', \n' : ''}
                </span>
              ))}
            </p>
          </div>

          <div className="film-card__text-col">
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Run Time</strong>
              <span className="film-card__details-value">{Math.floor(singleFilm.runTime / 60) }h {singleFilm.runTime % 60}m</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">{singleFilm.genre}</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">{singleFilm.released}</span>
            </p>
          </div>
        </div>
      )}
      {tab === 2 && (
        <div className="film-card__reviews-col">
          {comments.length
            ? (
              <div>
                {comments.map((comment) => (
                  <div key={`comment-${comment.id}`} className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">{comment.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">{comment.user.name}</cite>
                        <time className="review__date" dateTime="2016-12-24">
                          {new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{comment.rating}</div>
                  </div>
                ))}
              </div>)
            : <div>Пока нет ни одного коментария</div>}

        </div>
      )}
    </div>
  );
}

function displayRating (rating: number): string {
  if (rating <= 3) {
    return 'Bad';
  } else if (rating > 3 && rating <= 5) {
    return 'Normal';
  } else if (rating > 5 && rating <= 8) {
    return 'Good';
  } else if (rating > 8 && rating <= 9) {
    return 'Very good';
  } else if (rating > 10) {
    return 'Awesome';
  }
  return '';
}
