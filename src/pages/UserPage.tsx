import "../css/UserPage.css"
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile.tsx";

const UserPage = () => {

    return (
        <div>
            <Header/>
            <Outlet/>
            <div className={"user-page-container"}>
                <UserProfile/>
            </div>
        </div>
    );
};

export default UserPage;