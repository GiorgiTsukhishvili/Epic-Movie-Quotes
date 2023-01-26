import { UserAllInfoTypes } from 'types';

export type ProfilePageDesktopProps = {
  data: UserAllInfoTypes;
  addNewMessage: (text: string, isEmail?: boolean) => void;
};
