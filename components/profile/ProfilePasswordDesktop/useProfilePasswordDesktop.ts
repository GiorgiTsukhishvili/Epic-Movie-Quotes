import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const useProfilePasswordDesktop = () => {
  const { t } = useTranslation();
  const [passwordsVisible, setPasswordsVisible] = useState({
    password: false,
    password_confirmation: false,
  });

  return { t, passwordsVisible, setPasswordsVisible };
};

export default useProfilePasswordDesktop;
