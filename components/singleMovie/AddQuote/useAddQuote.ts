import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { createQuote } from 'services';
import { UserTypes } from 'types';
import { AddQuoteTypes } from './addQuoteTypes';

const useAddQuote = (
  id: number,
  setIsAddQuoteOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { t } = useTranslation();
  const {
    user: { name: authorName, image: authorImage },
  } = useSelector((state: { user: UserTypes }) => state);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddQuoteTypes>({
    mode: 'onChange',
    defaultValues: {
      id: id,
      'quote-en': '',
      'quote-ka': '',
      image: '',
    },
  });

  useWatch({ control, name: 'image' });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(createQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries('movie');
      setIsAddQuoteOpen(false);
    },
  });

  const onSubmit = (data: AddQuoteTypes) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    const formData = new FormData();

    formData.append('id', id.toString());
    formData.append('image', getValues().image);
    formData.append('quote-en', data['quote-en']);
    formData.append('quote-ka', data['quote-ka']);

    mutate(formData);
  };

  const handleFileUpload = (data: FileList | null) => {
    if (data !== null) {
      if (data[0]) {
        setValue('image', data[0]);
        clearErrors('image');
      }
    }
  };

  return {
    t,
    authorImage,
    authorName,
    onSubmit,
    handleSubmit,
    handleFileUpload,
    register,
    errors,
    getValues,
  };
};

export default useAddQuote;
