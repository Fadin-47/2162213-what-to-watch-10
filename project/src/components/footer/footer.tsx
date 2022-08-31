import Logo from '../logo/logo';

export default function Footer(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Logo styleLogo={'logo__link logo__link--light'}/>
      </div>
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
