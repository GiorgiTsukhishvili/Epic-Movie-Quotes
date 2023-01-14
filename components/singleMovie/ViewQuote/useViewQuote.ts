import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';
import { createComment, likeOrUnlike, showQuote } from 'services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { UserTypes } from 'types';
import { useForm } from 'react-hook-form';

const useViewQuote = (id: number) => {
  const { push } = useRouter();
  const {
    user: { name, image, id: userId },
  } = useSelector((state: { user: UserTypes }) => state);

  const { data, isLoading } = useQuery(['quote'], () => showQuote(id), {
    onError: () => push('/403'),
  });

  const queryClient = useQueryClient();

  const { mutate: likeMutation } = useMutation(likeOrUnlike, {
    onSuccess: () => {
      queryClient.invalidateQueries('quote');
      queryClient.invalidateQueries('movie');
    },
  });

  const { mutate: commentMutation } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('quote');
      queryClient.invalidateQueries('movie');
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ comment: string }>({
    mode: 'onChange',
    defaultValues: { comment: '' },
  });

  const onSubmit = (data: { comment: string }) => {
    commentMutation({ ...data, quote_id: quoteData.id });

    setValue('comment', '');
  };

  const quoteData = data ? data?.data[0] : '';

  const { t } = useTranslation();

  return {
    t,
    quoteData,
    name,
    image,
    isLoading,
    userId,
    likeMutation,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useViewQuote;
