import { useState } from 'react';
import { LandingPageFormTypes } from 'types';
import { useQuery } from 'hooks';

const useFormChooser = () => {
  const [whichForm, setWhichForm] = useState<LandingPageFormTypes>('');
  const { query } = useQuery();

  return { whichForm, setWhichForm, query };
};

export default useFormChooser;
