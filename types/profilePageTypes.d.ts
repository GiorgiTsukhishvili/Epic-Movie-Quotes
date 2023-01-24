type UserEmailTypes = {
  id: number;
  email: string;
  email_verified_at: string;
  is_primary: number;
  user_id: number;
};

export type UserAllInfoTypes = {
  id: number;
  name: string;
  image: string;
  google_id: null | number;
  emails: UserEmailTypes[];
};

export type ProfileFormTypes = {
  image: File | string;
  name: string;
  email: string;
};
