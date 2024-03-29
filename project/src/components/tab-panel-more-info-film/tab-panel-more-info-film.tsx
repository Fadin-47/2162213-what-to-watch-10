import { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { IFilmData } from '../../types/film-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getComments } from '../../store/comments/comments.api-actions';
import { selectComments } from '../../store/comments/comments.selector';
import showRating from '../../helpers/show-rating';
import { TabNumericName, tabPanelNames } from '../../const';

export default function TabPanelMoreInfoFilm({singleFilm}: PropsWithChildren<{singleFilm: IFilmData}>) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const [tab, setTab] = useState(TabNumericName.ZERO);

  const handleChangeGenre = (chooseTab: number) => (e: { preventDefault: () => void; }) => {
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
          {tabPanelNames.map((name, index) => (
            <li
              key={name}
              className={
                tab === index
                  ? 'film-nav__item film-nav__item--active'
                  : 'film-nav__item'
              }
            >
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
                onClick={handleChangeGenre(index)}
                className="film-nav__link"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {tab === TabNumericName.ZERO && (
        <Fragment>
          <div className="film-rating">
            <div className="film-rating__score">{singleFilm.rating}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">{showRating(Number(singleFilm.rating))}</span>
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
      {tab === TabNumericName.FIRST && (
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
      {tab === TabNumericName.SECOND && (
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

