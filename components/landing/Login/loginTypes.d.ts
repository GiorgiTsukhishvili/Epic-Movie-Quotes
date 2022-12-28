export type LoginProps = {
  setWhichForm: Dispatch<SetStateAction<string>>;
};

export type LoginFormTypes = {
  login: string;
  password: string;
  remember: boolean;
};
