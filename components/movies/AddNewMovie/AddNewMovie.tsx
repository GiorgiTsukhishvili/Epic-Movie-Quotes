import { MovieInputs, useAddNewMovie } from 'components';

import { AddNewMovieProps } from './addNewMovieTypes';

const AddNewMovie: React.FC<AddNewMovieProps> = ({ setIsAddMovieOpen }) => {
  const {
    handleSubmit,
    register,
    onSubmit,
    errors,
    handleFileUpload,
    getValues,
  } = useAddNewMovie();

  return (
    <MovieInputs
      handleFileUpload={handleFileUpload}
      handleSubmit={handleSubmit}
      errors={errors}
      getValues={getValues}
      register={register}
      onSubmit={onSubmit}
      setModel={setIsAddMovieOpen}
    />
  );
};

export default AddNewMovie;
