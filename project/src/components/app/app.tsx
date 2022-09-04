import Main from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorNotFound from '../../pages/error-not-found/error-not-found';
import { AppRoute, TIME_RESET_TOASTS } from '../../const';
import SignIn from '../../pages/sign-in/sign-in';
import PrivateRoutes from '../private-routes/private-routes';
import MyList from '../../pages/my-list/my-list';
import Movie from '../../pages/movie/movie';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectRequestError } from '../../store/user-process/user-process.selectors';
import Toasts from '../toasts/toasts';
import React, { useEffect } from 'react';
import { setRequestError } from '../../store/user-process/user-process.reducer';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const requestError = useAppSelector(selectRequestError);
  useEffect(() => {
    if (requestError) {
      setTimeout(() => {
        dispatch(setRequestError(null));
      }, TIME_RESET_TOASTS);
    }
  },[dispatch, requestError]);
  return (
    <BrowserRouter>
      {requestError && (
        <Toasts severity={requestError.severity} message={requestError.message} />
      )}
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
