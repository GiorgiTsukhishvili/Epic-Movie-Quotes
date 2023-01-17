import { useTranslation } from 'next-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { MovieFormTypes } from 'types';
import { addNewMovieFormValue } from 'utils';

const useAddNewMovie = () => {
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

  const onSubmit = (data: MovieFormTypes) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    if (getValues().tags.length === 0) {
      setError('tags', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    console.log(data);
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
