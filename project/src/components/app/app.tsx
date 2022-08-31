import Main from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorNotFound from '../../pages/error-not-found/error-not-found';
import { AppRoute } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoutes from '../private-routes/private-routes';
import MyList from '../../pages/my-list/my-list';
import Movie from '../../pages/movie/movie';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
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
            <Main/>
          }
        />
        <Route path={AppRoute.Login} element={<SignIn/>} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoutes isAuth={authorizationStatus}>
              <MyList/>
            </PrivateRoutes>
          }
        />
        <Route path={AppRoute.Film} element={<Movie/>}>
          <Route path=':id' element={<Movie/>}/>
        </Route>
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoutes isAuth={authorizationStatus}>
              <AddReview/>
            </PrivateRoutes>
          }
        />
        <Route path={AppRoute.Player} element={<Player/>} />
        <Route path='*' element={<ErrorNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
