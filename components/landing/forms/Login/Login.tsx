import React, { Fragment } from 'react';
import { LoginProps } from './loginTypes';

const Login: React.FC<LoginProps> = ({ setWhichForm }) => {
  return (
    <Fragment>
      <div className='fixed md:w-[37.563rem] md:h-[35.125rem] h-screen w-screen bg-zinc-850 z-30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[0.625rem]'>
        Login
      </div>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-[20] backdrop-blur-sm	'
        onClick={() => setWhichForm('')}
      />
    </Fragment>
  );
};

export default Login;
