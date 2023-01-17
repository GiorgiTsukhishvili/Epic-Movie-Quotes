export type AddNewMovieProps = {
  setIsAddMovieOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddNewMovieTypes = {
  'name-en': string;
  'name-ka': string;
  'director-en': string;
  'director-ka': string;
  budget: string;
  date: string;
  'description-en': string;
  'description-ka': string;
  image: string | File;
  tags: string[];
};
