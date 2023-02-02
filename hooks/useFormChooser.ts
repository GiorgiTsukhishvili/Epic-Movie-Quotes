import { useEffect, useState } from 'react';
import { LandingPageFormTypes } from 'types';
import { useQuery } from 'hooks';

const useFormChooser = () => {
  const [whichForm, setWhichForm] = useState<LandingPageFormTypes>('');
  const { query } = useQuery();

  useEffect(() => {
    if (query.type === 'login') {
      setWhichForm('login');
    }
    if (query.type === 'register') {
      setWhichForm('registration');
    }

    if (query.type === 'email-verified') {
      setWhichForm('email-verified');
    }
  }, [query]);

  return { whichForm, setWhichForm, query };
};

export default useFormChooser;
