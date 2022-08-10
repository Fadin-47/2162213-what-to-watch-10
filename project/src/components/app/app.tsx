import MainPage, {IHeadFilmMainProps} from '../../pages/main/main.page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorNotFound from '../../pages/error-not-found/error-not-found';
import { AppRoute } from '../../const';
import SignInPage from '../../pages/sign-in/sign-in.page';
import PrivateRoutes from '../private-routes/private-routes';
import MyListPage from '../../pages/my-list/my-list.page';
import MoviePage from '../../pages/movie/movie.page';
import AddReviewPage from '../../pages/add-review/add-review.page';
import PlayerPage from '../../pages/player/player.page';
import {IFilmCardProps} from '../film-card/film-card.component';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

export interface IUser {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
}

export interface initStore {
  headFilm: IHeadFilmMainProps;
  filmCard: IFilmCardProps[];
  user: IUser;
}

function App(props: initStore): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              headFilm={props.headFilm}
              filmCard={props.filmCard}
              user={props.user}
            />
          }
        />
        <Route path={AppRoute.Login} element={<SignInPage/>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoutes isAuth={authorizationStatus}>
              <MyListPage filmsCard={props.filmCard} user={props.user}/>
            </PrivateRoutes>
          }
        />
        <Route path={AppRoute.Film} element={<MoviePage filmsCard={props.filmCard} user={props.user}/>}/>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoutes isAuth={authorizationStatus}>
              <AddReviewPage filmsCard={props.filmCard} user={props.user}/>
            </PrivateRoutes>
          }
        />
        <Route path={AppRoute.Player} element={<PlayerPage filmsCard={props.filmCard}/>} />
        <Route path='*' element={<ErrorNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
