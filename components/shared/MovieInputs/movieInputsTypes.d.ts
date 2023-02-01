import { MovieFormTypes } from 'types';

export type MovieInputsTypes = {
  handleSubmit: UseFormHandleSubmit<object>;
  register: UseFormRegister<object>;
  onSubmit: (data: MovieFormTypes) => void;
  errors: Partial<FieldErrorsImpl<object>>;
  handleFileUpload: (data: FileList | null) => void;
  getValues: UseFormGetValues<object>;
  setModel: Dispatch<SetStateAction<boolean>>;
  removeTag: (newTag: string) => void;
  isEdit?: boolean;
};
