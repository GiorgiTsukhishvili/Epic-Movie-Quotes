export type RegistrationProps = {
  setWhichForm: Dispatch<SetStateAction<string>>;
};

export type RegistrationTypes = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
