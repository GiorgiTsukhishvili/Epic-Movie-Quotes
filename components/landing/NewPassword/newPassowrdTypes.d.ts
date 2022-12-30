export type NewPasswordTypes = {
  password: string;
  password_confirmation: string;
};

export type NewPasswordProps = {
  setWhichForm: Dispatch<SetStateAction<string>>;
};
