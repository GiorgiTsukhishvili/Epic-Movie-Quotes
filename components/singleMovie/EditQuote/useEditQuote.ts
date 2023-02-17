import { useQuery } from 'hooks';
import { useTranslation } from 'next-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { updateQuote } from 'services';
import { UserTypes } from 'types';
import { EditQuoteTypes } from './editQuoteTypes';

const useEditQuote = (
  quoteImage: string,
  quoteText: { en: string; ka: string },
  quoteId: number,
  movieId: number
) => {
  const { t } = useTranslation();
  const {
    user: { name, image },
  } = useSelector((state: { user: UserTypes }) => state);
  const { push } = useQuery();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<EditQuoteTypes>({
    mode: 'onChange',
    defaultValues: {
      id: quoteId,
      'quote-en': quoteText.en,
      'quote-ka': quoteText.ka,
      image: quoteImage,
    },
  });

  useWatch({ control, name: 'image' });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries('movie');
      push(`/movies/${movieId}`);
    },
  });

  const onSubmit = (data: EditQuoteTypes) => {
    const formData = new FormData();

    formData.append('id', quoteId.toString());
    formData.append('image', getValues().image);
    formData.append('quote-en', data['quote-en']);
    formData.append('quote-ka', data['quote-ka']);

    mutate(formData);
  };

  const handleFileUpload = (data: FileList | null) => {
    if (data !== null) {
      if (data[0].size > 2 * 1024 * 1024) {
        setError('image', { message: t('errors.largeFile')! });
        return;
      }

      if (data[0]) {
        setValue('image', data[0]);
      }
    }
  };

  return {
    t,
    name,
    image,
    onSubmit,
    handleSubmit,
    register,
    getValues,
    handleFileUpload,
    errors,
  };
};

export default useEditQuote;
