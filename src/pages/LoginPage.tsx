import "../css/LoginPage.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header/>
      <Outlet/>
      <div className={"login-page-container"}>
        <div className={"login-div"}>
          <Login/>
        </div>

        <div className={"signup-div"}>
          <p>{t('no_account')}</p>
          <Link to="/signup" className={"click-here-button"}>
            {t('click_here')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
