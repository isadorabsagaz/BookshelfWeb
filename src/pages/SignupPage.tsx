import "../css/SignupPage.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Signup from "../components/Signup";

const SignupPage = () => {
  return (
    <div>
      <Header />
      <Outlet />

      <div className={"signup-page-container"}>
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
