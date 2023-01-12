export type EditQuoteProps = {
  setIsQuoteModelOpen: Dispatch<SetStateAction<string>>;
  quoteId: number;
  quoteImage: string;
  quoteText: { en: string; ka: string };
  removeQuery: (id: number) => void;
};

export type EditQuoteTypes = {
  id: number;
  'quote-en': string;
  'quote-ka': string;
  image: string | File;
};
