export type AddQuoteProps = {
  date: string;
  director: { en: string; ka: string };
  id: number;
  image: string;
  name: { en: string; ka: string };
  tags: {
    id: number;
    movie_id: number;
    tags: {
      en: string;
      ka: string;
    };
    created_at: string;
    updated_at: string | null;
  }[];

  setIsAddQuoteOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddQuoteTypes = {
  id: number;
  'quote-en': string;
  'quote-ka': string;
  image: string | File;
};
