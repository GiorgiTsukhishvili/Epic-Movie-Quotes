import { MovieInputs, useEditMovie } from 'components';
import { EditMovieProps } from './editMovieTypes';

const EditMovie: React.FC<EditMovieProps> = ({
  setIsEditMovieOpen,
  formData,
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    handleFileUpload,
    removeTag,
    addOrRemoveTag,
  } = useEditMovie(formData);

  return (
    <MovieInputs
      setModel={setIsEditMovieOpen}
      register={register}
      handleFileUpload={handleFileUpload}
      onSubmit={onSubmit}
      errors={errors}
      getValues={getValues}
      handleSubmit={handleSubmit}
      removeTag={removeTag}
      addOrRemoveTag={addOrRemoveTag}
    />
  );
};

export default EditMovie;
