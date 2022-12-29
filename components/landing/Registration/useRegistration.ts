import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

const useRegistration = () => {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return { t, register, handleSubmit, onSubmit, errors };
};

export default useRegistration;
