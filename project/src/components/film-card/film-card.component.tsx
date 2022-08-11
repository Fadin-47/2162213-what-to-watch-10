import { PropsWithChildren, useState } from 'react';
import {Link} from 'react-router-dom';
import { IFilmData } from '../../types/film-data';

function FilmCardComponent({ filmCard }: PropsWithChildren<{ filmCard: IFilmData }>): JSX.Element {
  const [selectedFilm, setSelectedFilm] = useState<number | null>( null);
  const handleSelectedFilm = () => setSelectedFilm(filmCard.id);
  // eslint-disable-next-line no-console
  //console.log(selectedFilm);
  // Выключение линтера для console.log обусловленно тем, что переменая selectedFilm - не используется
  return (
    <article onMouseOver={handleSelectedFilm} className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        {selectedFilm}
        <img
          src={filmCard.previewImage}
          alt={filmCard.name} width="280" height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`films/${filmCard.id}`}
          key={filmCard.id}
        >
          {filmCard.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCardComponent;
