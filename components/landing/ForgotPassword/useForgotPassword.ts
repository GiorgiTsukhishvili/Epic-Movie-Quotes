import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCSRFToken, sendUserResetEmail } from 'services';
import { ForgotPasswordTypes } from './forgotTypes';

const useForgotPassword = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ForgotPasswordTypes>({
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  const { email } = getValues();

  const onSubmit = async (
    data: ForgotPasswordTypes,
    setWhichForm: Dispatch<SetStateAction<string>>
  ) => {
    try {
      await fetchCSRFToken();
      const response = await sendUserResetEmail(data);

      if (response.status === 201) {
        setWhichForm('forgot-sent');
      }
    } catch (err) {
      deleteCookie('XSRF-TOKEN');
      if (err instanceof AxiosError) {
        if (err.response!.data) {
          setError('email', {
            type: 'all',
            message: err.response!.data.message.toString(),
          });
        }
        if (err.response!.data?.errors?.email) {
          setError('email', {
            type: 'all',
            message: t('errors.emailDoesNotExist')!,
          });
        }
      }
    }
  };

  return { t, register, handleSubmit, onSubmit, errors, email };
};

export default useForgotPassword;
