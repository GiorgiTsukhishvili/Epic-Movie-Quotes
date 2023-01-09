import { deleteCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userLogout } from 'services';
import { UserTypes } from 'types';

const useUserNavbar = () => {
  const [isMobileProfileOpen, setIsMobileProfileOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const { push } = useRouter();
  const {
    user: { name, image },
  } = useSelector((state: { user: UserTypes }) => state);

  const logoutUser = async () => {
    try {
      await userLogout();
      deleteCookie('XSRF-TOKEN');
      push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsMobileProfileOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', (e) => closeDropdown(e));

    return () =>
      window.removeEventListener('mousedown', (e) => closeDropdown(e));
  }, [isMobileProfileOpen]);

  return {
    t,
    logoutUser,
    isMobileProfileOpen,
    setIsMobileProfileOpen,
    name,
    image,
    ref,
  };
};

export default useUserNavbar;
