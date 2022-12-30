import { useState } from 'react';

const useFormChooser = () => {
  const [whichForm, setWhichForm] = useState<string>('registration');

  return { whichForm, setWhichForm };
};

export default useFormChooser;
