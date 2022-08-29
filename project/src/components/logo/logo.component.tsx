import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function LogoComponent({ styleLogo = 'logo' }: PropsWithChildren<{styleLogo?: string}>) {
  return (
    <div className={styleLogo}>
      <Link className="logo__link" to={AppRoute.Main}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
