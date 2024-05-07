import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import InputForm from '../../components/form/InputForm';
import AuthImg from '../../assets/images/auth-image.jpeg';
import Button from '../../components/button/Button';
import { PATH } from '../../constant/path';
import { checkIfEmpty } from '../../utils/validation';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { useLoginAccount } from '../../hooks/auth.hook';
import { setCookie } from '../../utils/cookie';
import { AUTH_COOKIE_CONFIG } from '../../constant/common';
import { getValue } from '../../utils/object';
import { useAuthContext } from '../../hooks/contextConsumer.hook';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loginAccountData, setLoginAccountData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: loginAccount, isPending } = useLoginAccount();
  const { setIsLoggedIn } = useAuthContext();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginAccountData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const verifyFields = () => {
    if (checkIfEmpty(loginAccountData.email)) {
      showErrorMessage('Please enter email');
      return false;
    }
    if (checkIfEmpty(loginAccountData.password)) {
      showErrorMessage('Please enter password');
      return false;
    }

    return true;
  };

  const onLoginAccount = async () => {
    try {
      if (!verifyFields()) {
        return;
      }
      const response = await loginAccount(loginAccountData);
      setCookie({
        cookieName: AUTH_COOKIE_CONFIG.loggedInCookie,
        value: 'true',
        expiresIn: 1,
      });
      setIsLoggedIn(true);
      showSuccessMessage(getValue(response, 'message'));
      navigate(PATH.dashboard);
    } catch (error: any) {
      showErrorMessage(getValue(error, 'message'));
    }
  };

  return (
    <div className="w-full flex flex-wrap  justify-center   lg:justify-between  h-screen px-6 lg:px-0 overflow-hidden">
      <div className="w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-20 lg:mt-32">
        <div className="w-full lg:w-[60%] flex flex-col gap-8">
          <h2 className="text-3xl font-bold">Welcome back! ✨</h2>

          <div>
            <InputForm
              value={loginAccountData.email}
              onChange={onInputChange}
              name="email"
              type="email"
              label="Email Address"
            />
          </div>
          <div>
            <InputForm
              value={loginAccountData.password}
              onChange={onInputChange}
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              showEye
              onEyeClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="">
            <Button
              title="Sign In"
              onClick={onLoginAccount}
              styles={`${isPending ? 'bg-gray-500' : 'bg-[#6366f2]'}`}
            />
          </div>

          <div className="border-t border-gray-500 pt-4">
            <p className="text-gray-500 font-light text-sm">
              New to BlockSeas?
              <Link
                to={PATH.signUp}
                className="pl-2 text-[#6366f1] hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="pt-1">
              <p className="text-gray-500 font-light text-sm">
                Forgot password?
                <Link
                  to={PATH.forgotPassowrd}
                  className="pl-2 text-[#6366f1] hover:underline"
                >
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 ">
        <img src={AuthImg} alt="Authentication" className="h-full" />
      </div>
    </div>
  );
};

export default Login;
