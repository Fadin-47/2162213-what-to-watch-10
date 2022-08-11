import { PropsWithChildren, useEffect } from 'react';
import { AuthorizationStatus, FavoriteAction } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorite, postFavorite } from '../../store/films/films.api-actions';
import { selectFavorites } from '../../store/films/films.selector';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';

export default function MyListButton({filmId, isFavorite}: PropsWithChildren<{filmId: number, isFavorite: boolean}>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFavorite());
    dispatch(postFavorite({ filmId: 2,
      status: FavoriteAction.ADD}));
  }, [dispatch]);

  const favorite = useAppSelector(selectFavorites);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const onPostFavorite = () => {
    dispatch(postFavorite({ filmId: filmId, status: isFavorite ? FavoriteAction.REMOTE : FavoriteAction.ADD}));
  };
  return (
    <button
      disabled={authorizationStatus !== AuthorizationStatus.Auth}
      onClick={onPostFavorite}
      className="btn btn--list film-card__button"
      type="button"
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {!isFavorite && (
          <use xlinkHref="#add"/>
        )}
        {isFavorite && (
          <use xlinkHref="#in-list"/>
        )}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favorite.length}</span>
    </button>
  );
}
