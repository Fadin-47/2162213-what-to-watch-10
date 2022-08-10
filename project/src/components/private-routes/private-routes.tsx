import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

interface IPrivateRoutes {
  isAuth: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoutes(props: IPrivateRoutes): JSX.Element {
  const { isAuth, children } = props;
  return (
    isAuth === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoutes;
