import React, { PropsWithChildren, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IFilmData } from '../../types/film-data';
import './film-card.css';

function FilmCardComponent({ filmCard }: PropsWithChildren<{ filmCard: IFilmData }>): JSX.Element {
  const [selectedFilm, setSelectedFilm] = useState<number | null>( null);
  const [isHovering, setIsHovering] = useState(false);
  const handleSelectedFilm = () => setSelectedFilm(filmCard.id);
  const {pathname} = useLocation();
  const onAutoPlayVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };
  const onAutoPauseVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  };
  let timerId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    timerId = setTimeout(() => {
      setIsHovering(true);
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    clearTimeout(timerId);
  };

  //TODO: проработать показ видео
  return (
    <article
      onMouseOver={handleSelectedFilm}
      className="small-film-card catalog__films-card"
    >
      <Link
        to={pathname.length === 1 ? `/films/${filmCard.id}` : filmCard.id.toString()}
        key={filmCard.id}
      >
        <div
          className='small-film-card__image'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            style={{
              position: 'absolute',
              opacity: isHovering ? 0 : 1,
            }}
            src={filmCard.previewImage}
            alt={filmCard.name}
            width="280"
            height="175"
          />
          <video
            style={{
              borderRadius: '12px',
              position: 'absolute',
              opacity: isHovering ? 1 : 0,
              zIndex: 1000,
            }}
            onMouseOver={onAutoPlayVideo}
            onMouseOut={onAutoPauseVideo}
            loop
            muted
            width="280"
            height="175"
          >
            <source src={filmCard.previewVideoLink}/>
          </video>
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={pathname.length === 1 ? `/films/${filmCard.id}` : filmCard.id.toString()}
          key={filmCard.id}
        >
          {filmCard.name}{selectedFilm}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCardComponent;
