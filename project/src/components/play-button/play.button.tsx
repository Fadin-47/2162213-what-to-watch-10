import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export default function PlayButton({filmId, videoLink}: PropsWithChildren<{filmId: number, videoLink: string}>) {

  return (
    <Link style={{ textDecoration: 'none', marginRight: 16 }} to={`/player/${filmId}`}>
      <button
        style={{ padding: '15px 30px'}}
        className="btn btn--play film-card__button"
        type="button"
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref='#play-s'/>
        </svg>
        <span>Play</span>
      </button>
    </Link>
  );
}
