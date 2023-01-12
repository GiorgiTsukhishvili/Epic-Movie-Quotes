export type ViewQuoteProps = {
  setIsQuoteModelOpen: Dispatch<SetStateAction<string>>;
  quoteId: number;
  removeQuery: (id: number) => void;
};
