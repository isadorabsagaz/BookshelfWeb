import "../css/SignupPage.css";
import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";

const SignupPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default SignupPage;