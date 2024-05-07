import React from 'react';

import InputForm from '../../components/form/InputForm';
import AuthImg from '../..//assets/images/auth-image.jpeg';
import Button from '../../components/button/Button';

const ForgotPassword: React.FC = () => {
  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  h-screen px-6 lg:px-0 overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <h2 className="text-3xl font-bold">Reset your Password ✨</h2>

          <div>
            <InputForm
              value={''}
              onChange={() => {}}
              name="password"
              type="password"
              label="Password"
            />
          </div>

          <div className="">
            <Button
              title="Send Reset Link"
              onClick={() => {}}
              styles="bg-[#6366f2]"
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImg} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default ForgotPassword;
