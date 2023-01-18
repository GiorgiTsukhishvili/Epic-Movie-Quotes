import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { createComment } from 'services';
import { UserTypes } from 'types';

const useNewsFeedCommentForm = (id: number) => {
  const { t } = useTranslation();

  const {
    user: { image },
  } = useSelector((state: { user: UserTypes }) => state);

  const queryClient = useQueryClient();

  const { mutate: commentMutation } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('quotes');
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
    commentMutation({ ...data, quote_id: id.toString() });

    setValue('comment', '');
  };

  return { onSubmit, handleSubmit, errors, register, image, t };
};

export default useNewsFeedCommentForm;
