import HeaderComponent from '../../components/header/header.component';
import FooterComponent from '../../components/footer/footer.component';
import { useAppSelector } from '../../hooks';
import { selectFavorites } from '../../store/films/films.selector';
import FilmCardComponent from '../../components/film-card/film-card.component';


function MyListPage() {
  const favoriteFilms = useAppSelector(selectFavorites);

  return (
    <div className="user-page">
      <HeaderComponent styleHeader={'page-header user-page__head'} >
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
      </HeaderComponent>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <div className="catalog__films-list">
          {favoriteFilms.map((favorite) => (
            <FilmCardComponent key={favorite.name} filmCard={favorite}/>
          ))}
        </div>
      </section>
      <FooterComponent/>
    </div>
  );
}

export default MyListPage;
