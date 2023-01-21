export type NotificationsTypes = {
  user_id: number;
  person_id: number;
  is_new: boolean;
  is_comment: boolean;
  quote_id: number;
  created_at: string;
  id: number;
  person: {
    id: number;
    image: string;
    name: string;
  };
  quote: {
    id: number;
    movie_id: number;
  };
};
