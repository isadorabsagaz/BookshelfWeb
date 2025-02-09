import "../css/SignupPage.css";
import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import Signup from "../components/Signup.tsx";

const SignupPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>

            <div className={"signup-page-container"}>
                <Signup />
            </div>

        </div>
    );
};

export default SignupPage;