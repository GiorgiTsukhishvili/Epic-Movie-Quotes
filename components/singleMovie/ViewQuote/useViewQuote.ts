import { useQuery } from 'react-query';
import { useTranslation } from 'next-i18next';
import { showQuote } from 'services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { UserTypes } from 'types';

const useViewQuote = (id: number) => {
  const { push } = useRouter();
  const {
    user: { name, image },
  } = useSelector((state: { user: UserTypes }) => state);

  const { data } = useQuery(['quote'], () => showQuote(id), {
    onError: () => push('/403'),
  });

  const { t } = useTranslation();

  return { t, data, name, image };
};

export default useViewQuote;
