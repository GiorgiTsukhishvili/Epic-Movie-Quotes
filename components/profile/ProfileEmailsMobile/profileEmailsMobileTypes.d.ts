import { UserEmailTypes } from 'types';

export type ProfileEmailsMobileProps = {
  emails: UserEmailTypes[];
  google_id: number | null;
  setEmailStep: Dispatch<SetStateAction<string>>;
  setEmails: Dispatch<SetStateAction<UserEmailTypes[]>>;
};
