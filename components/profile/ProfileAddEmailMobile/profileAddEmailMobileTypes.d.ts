import { ProfileFormTypes } from 'types';

export type ProfileAddEmailMobileProps = {
  cancel: () => void;
  registerMobile: UseFormRegister<ProfileFormTypes>;
  errorsMobile: Partial<FieldErrorsImpl<ProfileFormTypes>>;
  setEmailStep: Dispatch<SetStateAction<string>>;
  getValuesMobile: UseFormGetValues<ProfileFormTypes>;
  setErrorMobile: UseFormSetError<ProfileFormTypes>;
  emails: UserEmailTypes[];
};
