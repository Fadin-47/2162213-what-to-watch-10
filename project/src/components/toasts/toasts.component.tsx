import { PropsWithChildren, useEffect, useState } from 'react';

export enum NameSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export interface IToasts {
  severity: NameSeverity,
  message: string
}

export default function ToastsComponent({severity, message }: PropsWithChildren<IToasts>) {

  const [toastsParam, setToastsParam] = useState<IToasts | null>({severity, message});

  useEffect(() => {
    setTimeout(() => {
      setToastsParam(null);
    }, 5000);
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

function colorToasts(severity: NameSeverity): string {
  if (severity === NameSeverity.ERROR) {
    return '#d50000';
  }
  if (severity === NameSeverity.SUCCESS) {
    return '#4caf50';
  }
  if (severity === NameSeverity.INFO) {
    return '#03a9f4';
  }
  if (severity === NameSeverity.WARNING) {
    return '#ff9800';
  }
  return '#673ab7';
}
