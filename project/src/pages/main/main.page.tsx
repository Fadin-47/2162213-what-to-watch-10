import { Fragment, useEffect } from 'react';
import FilmCardComponent from '../../components/film-card/film-card.component';
import {initStore} from '../../components/app/app';
import { AppRoute, FavoriteAction } from '../../const';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilms, getPromo, getSimilar, getSingleFilm } from '../../store/films/films.api-actions';
import { getFavorite, postFavorite } from '../../store/favorite/favorite.api-actions';
import PromoFilm from '../../components/promo-film/promo-film.component';
import { selectPromo } from '../../store/films/films.selector';

export interface IHeadFilmMainProps {
  title: string;
  genre: string;
  yearOfIssue: string;
  img: {
    src: string;
    width: string;
    height: string;
  };
}


function MainPage({ headFilm, filmCard, user }: initStore): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(selectPromo);
  useEffect(() => {
    dispatch(getFilms());
    dispatch(getSingleFilm({filmId: 1}));
    dispatch(getSimilar({filmId: 1}));
    dispatch(getPromo());
    dispatch(getFavorite());
    dispatch(postFavorite({ filmId: 2,
      status: FavoriteAction.ADD}));
  }, [dispatch]);
  return (
    <Fragment>
      {promoFilm && (
        <PromoFilm promo={promoFilm} />
      )}
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#top" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#top" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            {filmCard.map( (film) => (
              <FilmCardComponent
                key={`film-${film.title}`}
                filmCard={film}
              />
            ))}
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link className="logo__link logo__link--light" to={AppRoute.Main}>
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
}

export default MainPage;
