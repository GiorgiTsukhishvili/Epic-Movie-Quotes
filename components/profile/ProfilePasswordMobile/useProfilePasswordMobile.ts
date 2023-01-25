import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { ProfileFormTypes } from 'types';

const useProfilePasswordMobile = (
  password: string,
  password_confirmation: string,
  setErrorMobile: UseFormSetError<ProfileFormTypes>
) => {
  const { t } = useTranslation();

  const [passwordsVisible, setPasswordsVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  const checkPasswordValidations = () => {
    if (password === '' || password_confirmation === '') {
      setErrorMobile('password', {
        type: 'custom',
        message: t('form.login.required')!,
      });
      setErrorMobile('password_confirmation', {
        type: 'custom',
        message: t('form.login.required')!,
      });
      return false;
    }

    return true;
  };

  return { t, passwordsVisible, setPasswordsVisible, checkPasswordValidations };
};

export default useProfilePasswordMobile;
