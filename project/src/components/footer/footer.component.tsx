import LogoComponent from '../logo/logo.component';

export default function FooterComponent(): JSX.Element {
  return (
    <footer className="page-footer">
      <div className="logo">
        <LogoComponent styleLogo={'logo__link logo__link--light'}/>
      </div>
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
