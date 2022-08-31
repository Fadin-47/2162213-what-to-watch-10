import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUserData } from '../../store/user-process/user-process.selectors';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logOutAction } from '../../store/user-process/user-process.api-actions';

export default function User(): JSX.Element {
  const userData = useAppSelector(selectUserData);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  return(
    <Fragment>
      {!(authorizationStatus === AuthorizationStatus.Auth) && (
        <ul className="user-block">
          <li className="user-block__item">
            <div style={{width: '63px', height: '63px'}} className="user-block__avatar"/>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.Login}>Sign In</Link>
          </li>
        </ul>
      )}
      {authorizationStatus === AuthorizationStatus.Auth && userData && (
        <ul className="user-block">
          <li className="user-block__item">
            <Link to={AppRoute.MyList}>
              <div className="user-block__avatar">
                <img src={userData.avatarUrl} alt={userData.name} width="63" height="63"/>
              </div>
            </Link>
          </li>
          <li className="user-block__item">
            <div
              className="user-block__link"
              onClick={() => dispatch(logOutAction())}
            >
              Sign Out
            </div>
          </li>
        </ul>
      )}
    </Fragment>
  );
}
