import React, { useEffect, useRef } from 'react';
import { getSingleFilm } from '../../store/films/films.api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectSingleFilm } from '../../store/films/films.selector';
import { useNavigate, useParams } from 'react-router-dom';
import { useVideoPlayer } from '../../hooks/use-video-player';

function PlayerPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const singleFilm = useAppSelector(selectSingleFilm);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (params.id) {
      dispatch(getSingleFilm({filmId: params.id}));
    }
  },[dispatch, params.id]);

  const {
    playerOption,
    onPlayPauseVideo,
    onFullScreenOnOff,
    handleTimeProgress,
  } = useVideoPlayer(video.current);

  return (
    <div>
      {singleFilm && (
        <div className="player">
          <video
            ref={video}
            src={singleFilm.videoLink}
            className="player__video"
            poster={singleFilm.posterImage}
            onTimeUpdate={handleTimeProgress}
          >
          </video>
          <button onClick={() => navigate(-1)} type="button" className="player__exit">Exit</button>

          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress
                  className="player__progress"
                  value={playerOption.timeLine}
                  max="100"
                />
                <div className="player__toggler" style={{left: `${playerOption.timeLine}%`}}>Toggler</div>
              </div>
              <div className="player__time-value">{playerOption.timeEnd}</div>
            </div>

            <div className="player__controls-row">
              {!playerOption.isPlaying && (
                <button onClick={onPlayPauseVideo} type="button" className="player__play">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
              )}
              {playerOption.isPlaying && (
                <button onClick={onPlayPauseVideo} type="button" className="player__play">
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </button>
              )}
              <div className="player__name">{singleFilm.name}</div>

              <button onClick={onFullScreenOnOff} type="button" className="player__full-screen">
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerPage;
