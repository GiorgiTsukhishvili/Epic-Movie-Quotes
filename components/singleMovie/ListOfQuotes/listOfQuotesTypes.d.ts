import { Quotes } from 'types';

export type ListOfQuotesTypes = {
  quote: Quotes;
  removeQuote: (id: number) => void;
};
