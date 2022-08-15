import MainPage from '../../pages/main/main.page';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorNotFound from '../../pages/error-not-found/error-not-found';
import { AppRoute } from '../../const';
import SignInPage from '../../pages/sign-in/sign-in.page';
import PrivateRoutes from '../private-routes/private-routes';
import MyListPage from '../../pages/my-list/my-list.page';
import MoviePage from '../../pages/movie/movie.page';
import AddReviewPage from '../../pages/add-review/add-review.page';
import PlayerPage from '../../pages/player/player.page';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage/>
          }
        />
        <Route path={AppRoute.Login} element={<SignInPage/>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoutes isAuth={authorizationStatus}>
              <MyListPage/>
            </PrivateRoutes>
          }
        />
        <Route path={AppRoute.Film} element={<MoviePage/>}>
          <Route path=':id' element={<MoviePage/>}/>
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoutes isAuth={authorizationStatus}>
              <AddReviewPage/>
            </PrivateRoutes>
          }
        />
        <Route path={AppRoute.Player} element={<PlayerPage/>} />
        <Route path='*' element={<ErrorNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
