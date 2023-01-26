import { UserAllInfoTypes } from 'types';

export type ProfilePageMobileProps = {
  data: UserAllInfoTypes;
  addNewMessage: (text: string, isEmail?: boolean) => void;
};
