import { deleteCookie } from 'cookies-next';
import { useQuery } from 'hooks';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { fetchCSRFToken, sendNewPasswordDetails } from 'services';
import { NewPasswordTypes } from './newPassowrdTypes';

const useNewPassword = () => {
  const { t } = useTranslation();
  const [passwordsVisible, setPasswordsVisible] = useState({
    password: false,
    password_confirmation: false,
  });
  const [linkValid, setLinkValid] = useState<boolean>(true);

  const { query, push } = useQuery();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    control,
  } = useForm<NewPasswordTypes>({
    mode: 'onChange',
    defaultValues: { password: '', password_confirmation: '' },
  });

  useWatch({ control, name: 'password' });

  const { password, password_confirmation } = getValues();

  let link: string;

  try {
    let url = new URL(query['reset-link']?.toString()!);
    let params = new URLSearchParams(url.search);
    params.delete('expires');
    params.append('token', query.token as string);
    params.append('signature', query.signature as string);

    link = url.href + '&' + params;
  } catch (err) {
    push('/403');
  }

  const onSubmit = async (data: NewPasswordTypes) => {
    try {
      await fetchCSRFToken();
      const response = await sendNewPasswordDetails(link, data);
      if (response.status === 201) {
        push('/?password-change=success');
      }
    } catch (err) {
      deleteCookie('XSRF-TOKEN');
      setLinkValid(false);
    }
  };

  return {
    t,
    register,
    errors,
    password,
    password_confirmation,
    handleSubmit,
    onSubmit,
    passwordsVisible,
    setPasswordsVisible,
    linkValid,
  };
};

export default useNewPassword;
