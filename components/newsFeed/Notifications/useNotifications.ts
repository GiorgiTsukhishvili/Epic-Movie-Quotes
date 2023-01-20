import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

const useNotifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsNotificationsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', (e) => closeDropdown(e));

    return () => window.removeEventListener('click', (e) => closeDropdown(e));
  }, [isNotificationsOpen]);

  return { isNotificationsOpen, setIsNotificationsOpen, t, ref };
};

export default useNotifications;
