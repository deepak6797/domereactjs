import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import InputForm from '../../components/form/InputForm';
import AuthImg from '../../assets/images/auth-image.jpeg';
import Button from '../../components/button/Button';
import { PATH } from '../../constant/path';
import { useCreateAccount } from '../../hooks/auth.hook';
import { showErrorMessage } from '../../utils/toast';
import { checkIfEmpty } from '../../utils/validation';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [createAccountData, setCreateAccountData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: createAccount, isPending } = useCreateAccount();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAccountData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyFields = () => {
    if (checkIfEmpty(createAccountData.fullName)) {
      showErrorMessage('Please enter name');
      return false;
    }

    if (checkIfEmpty(createAccountData.email)) {
      showErrorMessage('Please enter email');
      return false;
    }
    if (checkIfEmpty(createAccountData.password)) {
      showErrorMessage('Please enter password');
      return false;
    }
    if (checkIfEmpty(createAccountData.confirmPassword)) {
      showErrorMessage('Please enter confirm password');
      return false;
    }

    if (createAccountData.password !== createAccountData.confirmPassword) {
      showErrorMessage('Password and confirm password must match');
      return false;
    }

    return true;
  };

  const onCreateAccount = async () => {
    try {
      if (!verifyFields()) {
        return;
      }
      await createAccount(createAccountData);
      navigate(PATH.login);
    } catch (error: any) {
      showErrorMessage(error?.message);
    }
  };

  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  min-h-screen px-6 lg:px-0 ">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <h2 className="text-3xl font-bold">Create your Account ✨</h2>
          <div>
            <InputForm
              value={createAccountData.fullName}
              onChange={onInputChange}
              name="fullName"
              type="text"
              label="Full Name"
            />
          </div>
          <div>
            <InputForm
              value={createAccountData.email}
              onChange={onInputChange}
              name="email"
              type="email"
              label="Email Address"
            />
          </div>
          <div>
            <InputForm
              value={createAccountData.password}
              onChange={onInputChange}
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              showEye
              onEyeClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div>
            <InputForm
              value={createAccountData.confirmPassword}
              onChange={onInputChange}
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              label="Confirm Password"
              showEye
              onEyeClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="">
            <Button
              title="Create account"
              onClick={onCreateAccount}
              styles={`${isPending ? 'bg-gray-500' : 'bg-[#6366f2]'}`}
              disabled={isPending}
            />
          </div>

          <div className="border-t border-gray-500 pt-4">
            <p className="text-gray-500 font-light text-sm">
              Have an account?
              <Link to={PATH.login} className="pl-2 text-[#6366f1]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImg} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default SignUp;
