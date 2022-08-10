import { PropsWithChildren, useEffect } from 'react';
import { getFavorite, postFavorite } from '../../store/favorite/favorite.api-actions';
import { FavoriteAction } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectFavorites } from '../../store/favorite/favorite.selector';

export default function MyListButton({filmId, isFavorite}: PropsWithChildren<{filmId: number, isFavorite: boolean}>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFavorite());
    dispatch(postFavorite({ filmId: 2,
      status: FavoriteAction.ADD}));
  }, [dispatch]);

  const favorite = useAppSelector(selectFavorites);

  const onPostFavorite = () => {
    dispatch(postFavorite({ filmId: filmId, status: isFavorite ? FavoriteAction.REMOTE : FavoriteAction.ADD}));
  };
  //TODO не обновляется фильм промо при отправке, подумать
  return (
    <button
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
