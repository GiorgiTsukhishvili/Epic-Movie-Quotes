import React from 'react';
import { RegistrationProps } from './registrationTypes';
import { useRegistration } from 'components';

const Registration: React.FC<RegistrationProps> = ({ setWhichForm }) => {
  const { t, errors, handleSubmit, onSubmit, register } = useRegistration();

  return <div>Registration</div>;
};

export default Registration;
