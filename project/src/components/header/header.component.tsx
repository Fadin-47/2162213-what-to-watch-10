import UserComponent from '../user/user.component';
import { PropsWithChildren } from 'react';
import LogoComponent from '../logo/logo.component';

export default function HeaderComponent({
  styleHeader, children
}: PropsWithChildren<{ styleHeader: string, children?: JSX.Element }>): JSX.Element {
  return(
    <header className={styleHeader}>
      <LogoComponent/>
      {children}
      <UserComponent/>
    </header>
  );
}
