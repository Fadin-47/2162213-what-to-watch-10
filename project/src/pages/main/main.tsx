import { Fragment, useEffect, useState } from 'react';
import FilmCard from '../../components/film-card/film-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorite, getFilms, getPromo } from '../../store/films/films.api-actions';
import PromoFilm from '../../components/promo-film/promo-film';
import { filterGenreFilms, selectPromo } from '../../store/films/films.selector';
import SideMenu from '../../components/side-menu/side-menu';
import Footer from '../../components/footer/footer';
import { ShowMoreParams } from '../../const';


function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(selectPromo);
  const filteredFilms = useAppSelector(filterGenreFilms);
  useEffect(() => {
    dispatch(getFilms());
    dispatch(getPromo());
    dispatch(getFavorite());
  }, [dispatch]);

  const [showMore, setShowMore] = useState<number>(ShowMoreParams.DEFAULT);
  useEffect(() => {
    if (filteredFilms.length) {
      filteredFilms.length > ShowMoreParams.START_VIEW ? setShowMore(ShowMoreParams.START_VIEW) : setShowMore(filteredFilms.length);
    }
  }, [filteredFilms]);

  const handleShowMore = () => {
    if ((showMore + ShowMoreParams.HOW_ADD) > filteredFilms.length) {
      setShowMore(filteredFilms.length);
    } else {
      setShowMore(showMore + ShowMoreParams.HOW_ADD);
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
          <SideMenu/>
          <div className="catalog__films-list">
            {filteredFilms.map((film, index) => {
              if (index <= showMore ) {
                return (
                  <FilmCard
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
                onClick={handleShowMore}
                className="catalog__button"
                type="button"
              >
                Show more
              </button>
            </div>
          )}
        </section>
        <Footer/>
      </div>
    </Fragment>
  );
}

export default Main;
