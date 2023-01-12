export type AddQuoteProps = {
  date: string;
  director: { en: string; ka: string };
  id: number;
  image: string;
  name: { en: string; ka: string };
  tags: string;

  setIsAddQuoteOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddQuoteTypes = {
  id: number;
  'quote-en': string;
  'quote-ka': string;
  image: string | File;
};
