import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteQuote } from 'services';

const useListOfQuotes = () => {
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [isQuoteModelOpen, setIsQuoteModelOpen] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries('movie');
    },
  });

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsViewOpen(false);
    }
  };

  const removeQuery = (id: number) => {
    mutate(id);
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
    removeQuery,
    isQuoteModelOpen,
    setIsQuoteModelOpen,
  };
};

export default useListOfQuotes;
