import { useState } from 'react';

const useFormChooser = () => {
  const [whichForm, setWhichForm] = useState<string>('');

  return { whichForm, setWhichForm };
};

export default useFormChooser;
