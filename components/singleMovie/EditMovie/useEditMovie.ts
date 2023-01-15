import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { EditMovieFormData } from './editMovieTypes';

const useEditMovie = (formData: EditMovieFormData) => {
  const { query } = useRouter();
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
  } = useForm<EditMovieFormData>({
    mode: 'onChange',
    defaultValues: formData,
  });

  useWatch({ control, name: 'image' });

  const onSubmit = (data: EditMovieFormData) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    console.log({ ...data, movie_id: query.movie });
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
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    handleFileUpload,
  };
};
export default useEditMovie;
