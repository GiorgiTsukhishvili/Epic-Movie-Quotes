export type MovieTypes = {
  created_at: string;
  date: string;
  description: string;
  director: string;
  id: number;
  image: string;
  name: string;
  quotes_count: number;
  tags: string;
  updated_at: string;
  user_id: number;
};

type Quotes = {
  created_at: string;
  id: number;
  image: string;
  movie_id: number;
  quote: string;
  updated_at: string;
};

export type SingleMovieTypes = {
  created_at: string;
  date: string;
  description: string;
  director: string;
  id: number;
  image: string;
  name: string;
  tags: string;
  updated_at: string;
  user_id: number;
  budget: string;
  quotes: Quotes[];
};
