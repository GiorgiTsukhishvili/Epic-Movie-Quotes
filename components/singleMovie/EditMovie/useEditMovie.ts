import { i18n, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getMovieGenres } from 'services';
import { EditMovieFormData } from './editMovieTypes';

const useEditMovie = (formData: EditMovieFormData) => {
  const { query } = useRouter();
  const { t } = useTranslation();

  const { data } = useQuery('genres', getMovieGenres);

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

  useWatch({ control, name: ['image', 'tags'] });

  const onSubmit = (data: EditMovieFormData) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    if (getValues().tags.length === 0) {
      setError('tags', { type: 'custom', message: t('form.login.required')! });
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

  const removeTag = (newTag: string) => {
    const newTags = getValues().tags.filter(
      (tag: { en: string; ka: string }) =>
        tag[i18n?.language as 'ka' | 'en'] !== newTag
    );

    setValue('tags', newTags);
  };

  const addOrRemoveTag = (newTag: string) => {
    if (
      getValues().tags.find(
        (tag: { en: string; ka: string }) =>
          tag[i18n?.language as 'ka' | 'en'] === newTag
      )
    ) {
      const newTags = getValues().tags.filter(
        (tag: { en: string; ka: string }) =>
          tag[i18n?.language as 'ka' | 'en'] !== newTag
      );
      setValue('tags', newTags);
    } else {
      const newTags = getValues().tags;
      newTags.push(
        data?.data.find(
          (tag: { en: string; ka: string }) =>
            tag[i18n?.language as 'ka' | 'en'] === newTag
        )
      );
      setValue('tags', newTags);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    handleFileUpload,
    removeTag,
    addOrRemoveTag,
  };
};
export default useEditMovie;
