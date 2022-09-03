import { PropsWithChildren, useEffect, useState } from 'react';
import { IToasts } from '../../types/components-data';
import colorToasts from '../../helpers/toasts-colors';
import { TIME_RESET_TOASTS } from '../../const';

export default function Toasts({severity, message }: PropsWithChildren<IToasts>) {

  const [toastsParam, setToastsParam] = useState<IToasts | null>({severity, message});

  useEffect(() => {
    setTimeout(() => {
      setToastsParam(null);
    }, TIME_RESET_TOASTS);
  },[toastsParam]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div>
      {toastsParam && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            padding: 8,
            color: 'white',
            overflow: 'hidden',
            width: '250px',
            borderRadius: 8,
            position: 'fixed',
            right: '50px',
            top: '50px',
            zIndex: 999,
            backgroundColor: colorToasts(toastsParam.severity),
          }}
        >
          <p>
            {toastsParam.message}
          </p>
        </div>
      )}
    </div>
  );
}
