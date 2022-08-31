import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { selectFavorites } from '../../store/films/films.selector';
import FilmCard from '../../components/film-card/film-card';


function MyList() {
  const favoriteFilms = useAppSelector(selectFavorites);

  return (
    <div className="user-page">
      <Header styleHeader={'page-header user-page__head'} >
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          {favoriteFilms.map((favorite) => (
            <FilmCard key={favorite.name} filmCard={favorite}/>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default MyList;
