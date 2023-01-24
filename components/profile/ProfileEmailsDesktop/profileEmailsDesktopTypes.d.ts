export type ProfileEmailsDesktopProps = {
  emails: {
    id: number;
    email: string;
    email_verified_at: string;
    is_primary: number;
    user_id: number;
  }[];
  setIsAddEmailOpen: Dispatch<SetStateAction<boolean>>;
};
