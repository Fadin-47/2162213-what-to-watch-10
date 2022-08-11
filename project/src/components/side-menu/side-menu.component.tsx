import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAllGenres, selectGenre } from '../../store/films/films.selector';
import { setChangeGenre } from '../../store/films/films.reducer';

export default function SideMenuComponent() {
  const dispatch = useAppDispatch();
  const allGenre = useAppSelector(selectAllGenres);
  const choseGenre = useAppSelector(selectGenre);
  const onChangeGenre = (genre: string | null) => (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(setChangeGenre(genre));
  };

  return (
    <ul className="catalog__genres-list">
      <li
        className={
          !choseGenre
            ? 'catalog__genres-item catalog__genres-item--active'
            : 'catalog__genres-item'
        }
      >
        <a style={{ cursor: 'pointer' }} onClick={onChangeGenre(null)} className="catalog__genres-link">All genres</a>
      </li>
      {allGenre.map((genre) => (
        <li
          key={`genre-${genre}`}
          className={
            choseGenre === genre
              ? 'catalog__genres-item catalog__genres-item--active'
              : 'catalog__genres-item'
          }
        >
          <a style={{ cursor: 'pointer' }} onClick={onChangeGenre(genre)} className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}
