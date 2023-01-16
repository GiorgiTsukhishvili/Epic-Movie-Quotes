export type MovieTypes = {
  created_at: string;
  date: string;
  description: { en: string; ka: string };
  director: { en: string; ka: string };
  id: number;
  image: string;
  name: { en: string; ka: string };
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
  quote: { en: string; ka: string };
  updated_at: string;
  comments_count: number;
  likes_count: number;
};

export type SingleMovieTypes = {
  created_at: string;
  date: string;
  description: { en: string; ka: string };
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
  updated_at: string;
  user_id: number;
  budget: string;
  quotes: Quotes[];
};
