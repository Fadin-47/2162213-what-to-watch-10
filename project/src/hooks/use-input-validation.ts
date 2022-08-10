import React, { ChangeEvent, useEffect, useState } from 'react';

export interface IValidationsProperties {
  minLength: number;
  isEmpty: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
}

const useValidation = (value: string, validations: IValidationsProperties) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const regexEmail = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/i;
  const regexPassword = /^(?=^.{2,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-zA-Z]).*$/i;
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setMinLength(true) : setMinLength(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          regexEmail.test(value) ? setEmailError(false) : setEmailError(true);
          break;
        case 'isPassword':
          regexPassword.test(value) ? setPasswordError(false) : setPasswordError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLength || emailError || passwordError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLength, emailError, passwordError]);

  return {
    isEmpty,
    minLength,
    emailError,
    passwordError,
    inputValid,
  };
};

export const useInputValidation = (initValue: string, validations: IValidationsProperties) => {
  const [value, setValue] = useState(initValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
