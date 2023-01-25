import { ProfileFormTypes } from 'types';

export type ProfileNameMobileProps = {
  registerMobile: UseFormRegister<ProfileFormTypes>;
  errorsMobile: Partial<FieldErrorsImpl<ProfileFormTypes>>;
  setNameEditStep: Dispatch<SetStateAction<string>>;
};
