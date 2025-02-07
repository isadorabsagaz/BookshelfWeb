import "../css/LoginPage.css";
import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";

const LoginPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <div className={"container"}>

                <div className={"login-container"}>
                    <p className={"title"}>Login to your account</p>

                    <p className={"user"}>User</p>
                    <input type="text" placeholder="Type your username..."/>

                    <p className={"password"}>Password</p>
                    <input type="text" placeholder="Type your password..."/>

                    <input type="submit" value="Remember me" />
                    <a href="https://wikirby.com/wiki/Sleep">Forgot password?</a>

                    <button className={"login-button"}>Login</button>
                </div>

                <div className={"signup-container"}>

                </div>

            </div>


        </div>
    );
};

export default LoginPage;