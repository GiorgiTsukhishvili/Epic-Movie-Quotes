import { UserEmailTypes } from 'types';

export type ProfileEmailsDesktopProps = {
  emails: UserEmailTypes[];
  setIsAddEmailOpen: Dispatch<SetStateAction<boolean>>;
  setEmails: Dispatch<SetStateAction<UserEmailTypes[]>>;
};
