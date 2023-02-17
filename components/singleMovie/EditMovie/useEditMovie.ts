import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { updateMovie } from 'services';
import { EditMovieFormData } from './editMovieTypes';

const useEditMovie = (
  formData: EditMovieFormData,
  setIsEditMovieOpen: Dispatch<SetStateAction<boolean>>
) => {
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

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries('movie');
      setIsEditMovieOpen(false);
    },
  });

  useWatch({ control, name: ['image', 'tags'] });

  const onSubmit = (data: EditMovieFormData) => {
    if (data.image === '') {
      setError('image', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    if (getValues().tags!.length === 0) {
      setError('tags', { type: 'custom', message: t('form.login.required')! });
      return;
    }

    const formData = new FormData();
    formData.append('id', query.movie! as string);
    formData.append('image', getValues().image!);
    formData.append('name-en', getValues()['name-en']!);
    formData.append('name-ka', getValues()['name-ka']!);
    formData.append('director-en', getValues()['director-en']!);
    formData.append('director-ka', getValues()['director-ka']!);
    formData.append('description-en', getValues()['description-en']!);
    formData.append('description-ka', getValues()['description-ka']!);
    formData.append('date', getValues()['date']!);
    formData.append('budget', getValues()['budget']!);
    formData.append('tags', JSON.stringify(getValues()['tags']!));

    mutate(formData);
  };

  const handleFileUpload = (data: FileList | null) => {
    if (data !== null) {
      if (data[0].size > 10 * 1024 * 1024) {
        setError('image', { message: t('errors.largeFile')! });
        return;
      }

      if (data[0]) {
        setValue('image', data[0]);
        clearErrors('image');
      }
    }
  };

  const removeTag = (newTag: string) => {
    const newTags = getValues().tags!.filter((tag: string) => tag !== newTag);

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
export default useEditMovie;
