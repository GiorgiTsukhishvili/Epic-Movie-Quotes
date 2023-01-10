import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const useLanguageSwitcher = () => {
  const { asPath, replace } = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const changeLanguage = (language: string) => {
    replace(asPath, asPath, { locale: language });
  };

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', (e) => closeDropdown(e));

    return () => window.removeEventListener('click', (e) => closeDropdown(e));
  }, [isDropdownOpen]);

  return { t, isDropdownOpen, setIsDropdownOpen, changeLanguage, ref };
};

export default useLanguageSwitcher;
