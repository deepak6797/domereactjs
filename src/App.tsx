import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layout/Layout";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { PATH } from "./constant/path";
import ForgotPassword from "./pages/auth/ForgotPassword";
// import PrivateRouteWrapper from './layout/PrivateRouteWrapper';
// import PublicRouteWrapper from "./layout/PublicRouteWrapper";
// import { useAuthContext } from "./hooks/contextConsumer.hook";

const App = () => {
  // const { isLoggedIn } = useAuthContext();
  return (
    <div className="dark:bg-[#0F172A]">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* <Route > */}
          {/* element={<PrivateRouteWrapper isLoggedIn={isLoggedIn} />} */}
          <Route path="/*" element={<Layout />} />
          {/* </Route> */}
          {/* <Route element={<PublicRouteWrapper isLoggedIn={isLoggedIn} />}> */}
            <Route path={PATH.signUp} element={<SignUp />} />
            <Route path={PATH.login} element={<Login />} />
            <Route path={PATH.forgotPassowrd} element={<ForgotPassword />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
