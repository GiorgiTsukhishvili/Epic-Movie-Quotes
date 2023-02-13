export type NormalInputProps = {
  text: string;
  register: UseFormRegister<object>;
  name: string;
  placeholder: string;
  labelText: string;
  type: string;
  language?: string;
  errorText?: string;
};
