import { deleteCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { userLogout } from 'services';
import { UserTypes } from 'types';

const useUserNavbar = () => {
  const [isMobileProfileOpen, setIsMobileProfileOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { t } = useTranslation();
  const { push, replace } = useRouter();
  const {
    user: { name, image },
  } = useSelector((state: { user: UserTypes }) => state);

  const logoutUser = async () => {
    try {
      await userLogout();
      deleteCookie('XSRF-TOKEN');
      deleteCookie('isLoggedIn');
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

  const { register, handleSubmit, setValue } = useForm<{ search: string }>({
    mode: 'onChange',
    defaultValues: { search: '' },
  });

  const queryClient = useQueryClient();

  const onSubmit = (data: { search: string }) => {
    replace({ query: data });
    queryClient.invalidateQueries({ queryKey: 'movies' });
    setValue('search', '');
  };

  return {
    t,
    logoutUser,
    isMobileProfileOpen,
    setIsMobileProfileOpen,
    name,
    image,
    ref,
    setIsSearchOpen,
    isSearchOpen,
    register,
    onSubmit,
    handleSubmit,
  };
};

export default useUserNavbar;
