export type EmailSentProps = {
  setWhichForm: Dispatch<SetStateAction<string>>;
  header: string;
  main: string;
  goToEmail: string;
  skip?: string;
};
