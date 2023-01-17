import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createMovie } from 'services';
import { MovieFormTypes } from 'types';
import { addNewMovieFormValue } from 'utils';

const useAddNewMovie = (
  setIsAddMovieOpen: Dispatch<SetStateAction<boolean>>
) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
    control,
    setError,
  } = useForm<MovieFormTypes>({
    mode: 'onChange',
    defaultValues: addNewMovieFormValue,
  });

  useWatch({ control, name: ['image', 'tags'] });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(createMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries(['movies']);
      setIsAddMovieOpen(false);
    },
  });

  const onSubmit = (data: MovieFormTypes) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    if (getValues().tags.length === 0) {
      setError('tags', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    const formData = new FormData();

    formData.append('image', getValues().image);
    formData.append('name-en', data['name-en']);
    formData.append('name-ka', data['name-ka']);
    formData.append('director-en', data['director-en']);
    formData.append('director-ka', data['director-ka']);
    formData.append('description-en', data['description-en']);
    formData.append('description-ka', data['description-ka']);
    formData.append('date', data['date']);
    formData.append('budget', data['budget']);
    formData.append('tags', JSON.stringify(data['tags']));

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

  const removeTag = (newTag: string) => {
    const newTags = getValues().tags.filter((tag: string) => tag !== newTag);

    setValue('tags', newTags);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    handleFileUpload,
    removeTag,
  };
};

export default useAddNewMovie;
