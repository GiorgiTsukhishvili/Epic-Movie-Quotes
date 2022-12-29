import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { ForgotPasswordTypes } from './forgotTypes';

const useForgotPassword = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordTypes>({
    mode: 'onChange',
    defaultValues: { email: '' },
  });

  const { email } = getValues();

  const onSubmit = (data: ForgotPasswordTypes) => {
    console.log(data);
  };

  return { t, register, handleSubmit, onSubmit, errors, email };
};

export default useForgotPassword;
