import { ProfileFormTypes } from 'types';

export type ProfilePasswordDesktopProps = {
  setIsPasswordEditOpen: Dispatch<SetStateAction<boolean>>;
  isPasswordEditOpen: boolean;
  register: UseFormRegister<ProfileFormTypes>;
  errors: Partial<FieldErrorsImpl<ProfileFormTypes>>;
  password: string;
};
