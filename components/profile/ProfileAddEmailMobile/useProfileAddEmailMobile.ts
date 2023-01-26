import { emailRegex } from 'config';
import { useTranslation } from 'next-i18next';
import { UseFormGetValues, UseFormSetError } from 'react-hook-form';
import { ProfileFormTypes, UserEmailTypes } from 'types';

const useProfileAddEmailMobile = (
  getValuesMobile: UseFormGetValues<ProfileFormTypes>,
  setErrorMobile: UseFormSetError<ProfileFormTypes>,
  emails: UserEmailTypes[]
) => {
  const { t } = useTranslation();

  const checkEmailValidation = () => {
    if (!emailRegex.test(getValuesMobile().email)) {
      setErrorMobile('email', {
        type: 'custom',
        message: t('form.forgotPassword.inputEmail')!,
      });
      return false;
    }

    if (emails.find((email) => email.email === getValuesMobile().email)) {
      setErrorMobile('email', {
        type: 'custom',
        message: t('user.profile.emailIsUsed')!,
      });
      return false;
    }

    return true;
  };

  return { t, checkEmailValidation };
};

export default useProfileAddEmailMobile;
