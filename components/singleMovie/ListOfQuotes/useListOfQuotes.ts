import { useQuery } from 'hooks';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

const useListOfQuotes = () => {
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const { query } = useQuery();
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsViewOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', (e) => closeDropdown(e));

    return () =>
      window.removeEventListener('mousedown', (e) => closeDropdown(e));
  }, [isViewOpen]);

  return {
    isViewOpen,
    setIsViewOpen,
    ref,
    t,
    query,
  };
};

export default useListOfQuotes;
