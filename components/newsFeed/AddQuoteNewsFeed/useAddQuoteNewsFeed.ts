import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { createQuote, getMovieNames } from 'services';
import { UserTypes } from 'types';
import { AddQuoteNewsFeedTypes } from './addQuoteNewsFeedTypes';

const useAddQuoteNewsFeed = () => {
  const { t } = useTranslation();
  const [isAddQuoteOpen, setIsAddQuoteOpen] = useState<boolean>(false);
  const {
    user: { name: authorName, image: authorImage },
  } = useSelector((state: { user: UserTypes }) => state);

  const { data: movieNames } = useQuery('names', getMovieNames);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddQuoteNewsFeedTypes>({
    mode: 'onChange',
    defaultValues: {
      id: '',
      'quote-en': '',
      'quote-ka': '',
      image: '',
    },
  });

  useWatch({ control, name: 'image' });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(createQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries('quotes');
      setIsAddQuoteOpen(false);
      setValue('id', '');
      setValue('image', '');
      setValue('quote-ka', '');
      setValue('quote-en', '');
    },
  });

  const onSubmit = (data: AddQuoteNewsFeedTypes) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    const formData = new FormData();

    formData.append('id', data.id);
    formData.append('image', data.image);
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
    isAddQuoteOpen,
    setIsAddQuoteOpen,
    movieNames,
  };
};

export default useAddQuoteNewsFeed;
