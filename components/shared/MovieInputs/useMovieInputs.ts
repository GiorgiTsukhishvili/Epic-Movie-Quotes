import { useQuery } from 'react-query';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { getMovieGenres } from 'services';
import { UserTypes } from 'types';
import { useEffect, useRef, useState } from 'react';

const useMovieInputs = () => {
  const { t } = useTranslation();
  const {
    user: { name, image },
  } = useSelector((state: { user: UserTypes }) => state);
  const ref = useRef<HTMLDivElement>(null);

  const [isGenresOpen, setIsGenresOpen] = useState<boolean>(false);

  const { data } = useQuery('genres', getMovieGenres);

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsGenresOpen(false);
    }
  };

  useEffect(() => {
    if (isGenresOpen === true) {
      window.addEventListener('click', (e) => closeDropdown(e));
    }

    return () => window.removeEventListener('click', (e) => closeDropdown(e));
  }, [isGenresOpen]);

  return { t, name, image, data, isGenresOpen, setIsGenresOpen, ref };
};

export default useMovieInputs;
