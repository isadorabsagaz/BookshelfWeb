import "../css/LoginPage.css";
import Header from "../components/Header";
import {Outlet} from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <div className={"container"}>

            </div>

            <div className={"signup-container"}>

            </div>

        </div>
    );
};

export default LoginPage;