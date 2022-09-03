import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAllGenres, selectGenre } from '../../store/films/films.selector';
import { setChangeGenre } from '../../store/films/films.reducer';

export default function SideMenu() {
  const dispatch = useAppDispatch();
  const allGenre = useAppSelector(selectAllGenres);
  const choseGenre = useAppSelector(selectGenre);
  const handleChangeGenre = (genre: string | null) => (e: { preventDefault: () => void; }) => {
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
        <button
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
          }}
          onClick={handleChangeGenre(null)}
          className="catalog__genres-link"
        >
          All genres
        </button>
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
          <button
            style={{
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={handleChangeGenre(genre)}
            className="catalog__genres-link"
          >
            {genre}
          </button>
        </li>
      ))}
    </ul>
  );
}
