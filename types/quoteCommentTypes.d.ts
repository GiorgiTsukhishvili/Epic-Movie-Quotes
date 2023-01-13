export type QuoteCommentTypes = {
  id: number;
  quote_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    image: string;
    google_id: string | null;
  };
};
