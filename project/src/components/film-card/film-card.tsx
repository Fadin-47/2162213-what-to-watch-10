import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IFilmData } from '../../types/film-data';
import './film-card.css';

function FilmCard({ filmCard }: PropsWithChildren<{ filmCard: IFilmData }>): JSX.Element {
  const [isHovering, setIsHovering] = useState(false);
  const videoPreview = useRef<HTMLVideoElement>(null);
  let timerId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    timerId = setTimeout(() => {
      setIsHovering(true);
    }, 1500);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    clearTimeout(timerId);
  };

  useEffect(() => {
    if (videoPreview && videoPreview.current) {
      if (isHovering) {
        videoPreview.current.play();
      } else {
        videoPreview.current.pause();
        videoPreview.current.currentTime = 0;
      }
    }
  }, [isHovering, videoPreview]);

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="small-film-card catalog__films-card"
    >
      <Link
        to={`/films/${filmCard.id}`}
        key={filmCard.id}
      >
        <div
          className='small-film-card__image'
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
            ref={videoPreview}
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
          to={`/films/${filmCard.id}`}
          key={filmCard.id}
        >
          {filmCard.name}
        </Link>
      </h3>

    </article>
  );
}

export default FilmCard;
