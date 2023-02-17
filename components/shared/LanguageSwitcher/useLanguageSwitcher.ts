import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const useLanguageSwitcher = () => {
  const { query, pathname } = useRouter();
  const languageRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const closeDropdown = (e: MouseEvent) => {
    if (
      languageRef.current &&
      !languageRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', (e) => closeDropdown(e));

    return () => window.removeEventListener('click', (e) => closeDropdown(e));
  }, [isDropdownOpen]);

  return { t, isDropdownOpen, setIsDropdownOpen, languageRef, query, pathname };
};

export default useLanguageSwitcher;
