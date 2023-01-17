export type AddQuoteProps = {
  date: string;
  director: { en: string; ka: string };
  id: number;
  image: string;
  name: { en: string; ka: string };
  tags: {
    id: number;
    tags: {
      en: string;
      ka: string;
    };
    pivot: {
      movie_id: number;
      tag_id: number;
    };
  }[];
  setIsAddQuoteOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddQuoteTypes = {
  id: number;
  'quote-en': string;
  'quote-ka': string;
  image: string | File;
};
