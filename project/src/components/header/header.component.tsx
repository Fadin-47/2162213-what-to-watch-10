import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import UserComponent from '../user/user.component';

export default function HeaderComponent(): JSX.Element {
  return(
    <header className="page-header film-card__head">
      <div className="logo">
        <Link className="logo__link" to={AppRoute.Main}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      <UserComponent/>
    </header>
  );
}
