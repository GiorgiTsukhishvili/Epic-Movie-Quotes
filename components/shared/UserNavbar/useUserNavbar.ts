import { deleteCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { userLogout } from 'services';

const useUserNavbar = () => {
  const [isMobileProfileOpen, setIsMobileProfileOpen] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const { push } = useRouter();

  const logoutUser = async () => {
    try {
      await userLogout();
      deleteCookie('XSRF-TOKEN');
      push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return { t, logoutUser, isMobileProfileOpen, setIsMobileProfileOpen };
};

export default useUserNavbar;
