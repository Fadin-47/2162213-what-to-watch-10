import { IFilmData } from '../../types/film-data';
import { PropsWithChildren } from 'react';
import HeaderComponent from '../header/header.component';
import PlayButton from '../play-button/play.button';
import MyListButton from '../my-list-button/my-list.button';

export default function PromoFilm({ promo }: PropsWithChildren<{ promo: IFilmData }>): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promo.backgroundImage} alt={promo.name}/>
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <HeaderComponent/>
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={promo.posterImage}
              alt={promo.name}
              width='218'
              height='327'
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo.genre}</span>
              <span className="film-card__year">{promo.released}</span>
            </p>

            <div className="film-card__buttons">
              <PlayButton videoLink={promo.videoLink}/>
              <MyListButton filmId={promo.id} isFavorite={promo.isFavorite}/>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
