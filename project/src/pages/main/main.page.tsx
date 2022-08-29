import { Fragment, useEffect, useState } from 'react';
import FilmCardComponent from '../../components/film-card/film-card.component';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorite, getFilms, getPromo } from '../../store/films/films.api-actions';
import PromoFilm from '../../components/promo-film/promo-film.component';
import { filterGenreFilms, selectPromo } from '../../store/films/films.selector';
import SideMenuComponent from '../../components/side-menu/side-menu.component';
import FooterComponent from '../../components/footer/footer.component';


function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(selectPromo);
  const filteredFilms = useAppSelector(filterGenreFilms);
  useEffect(() => {
    dispatch(getFilms());
    dispatch(getPromo());
    dispatch(getFavorite());
  }, [dispatch]);

  const [showMore, setShowMore] = useState<number>(0);
  useEffect(() => {
    if (filteredFilms.length) {
      filteredFilms.length > 7 ? setShowMore(7) : setShowMore(filteredFilms.length);
    }
  }, [filteredFilms]);

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
        <FooterComponent/>
      </div>
    </Fragment>
  );
}

export default MainPage;
