export type EditMovieFormData = {
  'name-en': string | undefined;
  'name-ka': string | undefined;
  'director-en': string | undefined;
  'director-ka': string | undefined;
  budget: string | undefined;
  date: string | undefined;
  'description-en': string | undefined;
  'description-ka': string | undefined;
  image: string | File | undefined;
};

export type EditMovieProps = {
  setIsEditMovieOpen: Dispatch<SetStateAction<boolean>>;
  formData: EditMovieFormData;
};
