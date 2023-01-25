import { ProfileFormTypes } from 'types';

export type ProfilePasswordMobileProps = {
  registerMobile: UseFormRegister<ProfileFormTypes>;
  errorsMobile: Partial<FieldErrorsImpl<ProfileFormTypes>>;
  setPasswordEditStep: Dispatch<SetStateAction<string>>;
  cancel: () => void;
  password: string;
  password_confirmation: string;
  setErrorMobile: UseFormSetError<ProfileFormTypes>;
};
