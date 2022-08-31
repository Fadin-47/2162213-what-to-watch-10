import User from '../user/user';
import { PropsWithChildren } from 'react';
import Logo from '../logo/logo';

export default function Header({
  styleHeader, children
}: PropsWithChildren<{ styleHeader: string, children?: JSX.Element }>): JSX.Element {
  return(
    <header className={styleHeader}>
      <Logo/>
      {children}
      <User/>
    </header>
  );
}
