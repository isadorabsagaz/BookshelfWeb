import "../css/LoginPage.css";
import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Login from "../components/Login";

const LoginPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
                <div className={"login-page-container"}>

                <div className={"login-div"}>
                    <Login/>
                </div>

                <div className={"signup-div"}>
                    <p>Don´t have an account yet?</p>
                    <Link to="/signup" className={"click-here-button"}>Click here</Link>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;