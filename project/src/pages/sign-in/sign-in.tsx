import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/user-process/user-process.api-actions';
import { useInputValidation } from '../../hooks/use-input-validation';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (auth === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [auth, navigate]);

  const email = useInputValidation('', { isEmail: true, isEmpty: true, minLength: 5, maxLength: 15});
  const password = useInputValidation('', { isPassword: true, isEmpty: true, minLength: 2, maxLength: 12});


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginAction({
      login: email.value,
      password: password.value,
    }));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="" className="sign-in__form" onSubmit={handleSubmit}>
          {email.emailError && email.isDirty && (
            <div className="sign-in__message">
              <p>Please enter a valid email address</p>
            </div>
          )}
          {password.passwordError && password.isDirty && (
            <div className="sign-in__message">
              <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                onChange={(e) => email.onChange(e)}
                onBlur={email.onBlur}
                value={email.value}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="login"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                onChange={(e) => password.onChange(e)}
                onBlur={password.onBlur}
                value={password.value}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button disabled={!email.inputValid || !password.inputValid} className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default SignIn;
