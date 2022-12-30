import { useState } from 'react';
import { LandingPageFormTypes } from 'types';

const useFormChooser = () => {
  const [whichForm, setWhichForm] = useState<LandingPageFormTypes>('');

  return { whichForm, setWhichForm };
};

export default useFormChooser;
