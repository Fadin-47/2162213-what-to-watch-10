import { Fragment, useEffect, useState } from 'react';
import FilmCardComponent from '../../components/film-card/film-card.component';
import { AppRoute, FavoriteAction } from '../../const';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorite, getFilms, getPromo, getSimilar, getSingleFilm, postFavorite } from '../../store/films/films.api-actions';
import PromoFilm from '../../components/promo-film/promo-film.component';
import { filterGenreFilms, selectPromo } from '../../store/films/films.selector';
import SideMenuComponent from '../../components/side-menu/side-menu.component';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(selectPromo);
  const filteredFilms = useAppSelector(filterGenreFilms);
  useEffect(() => {
    dispatch(getFilms());
    dispatch(getSingleFilm({filmId: 1}));
    dispatch(getSimilar({filmId: 1}));
    dispatch(getPromo());
    dispatch(getFavorite());
    dispatch(postFavorite({ filmId: 2,
      status: FavoriteAction.ADD}));
  }, [dispatch]);

  const [showMore, setShowMore] = useState<number>(0);
  useEffect(() => {
    if (filteredFilms.length) {
      filteredFilms.length > 7 ? setShowMore(7) : setShowMore(filteredFilms.length);
    }
  }, [filteredFilms]);
  // eslint-disable-next-line no-console
  console.log(filteredFilms.length);
  // eslint-disable-next-line no-console
  console.log(showMore);
  const onShowMore = () => {
    if ((showMore + 8) > filteredFilms.length) {
      setShowMore(filteredFilms.length);
    } else {
      setShowMore(showMore + 8);
    }
  };
  return (
    <Fragment>
      {promoFilm && (
        <PromoFilm promo={promoFilm} />
      )}
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <SideMenuComponent/>
          <div className="catalog__films-list">
            {filteredFilms.map((film, index) => {
              if (index <= showMore ) {
                return (
                  <FilmCardComponent
                    key={`film-${film.name}`}
                    filmCard={film}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          {showMore !== filteredFilms.length && (
            <div className="catalog__more">
              <button
                onClick={onShowMore}
                className="catalog__button"
                type="button"
              >
                Show more
              </button>
            </div>
          )}
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
