export type NewsFeedPageProps = {
  id: number;
  movie_id: number;
  quote: {
    en: string;
    ka: string;
  };
  image: string;
  likes: {
    id: number;
    quote_id: number;
    user_id: number;
  }[];
  comments: {
    id: number;
    quote_id: number;
    user_id: number;
    comment: string;
    user: {
      id: number;
      name: string;
      image: string;
    };
  }[];
  movie: {
    id: number;
    user_id: number;
    name: {
      en: string;
      ka: string;
    };
    date: string;
    user: {
      id: number;
      name: string;
      image: string;
    };
  };
};
