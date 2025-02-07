import bookshelfLogo from "../assets/BookshelfIcon.svg";
import "../css/Header.css";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div>
            <header className="app-header">
                <img src={bookshelfLogo} alt="bookshlf icon"/>
                <p className={"title"}>Bookshelf</p>
                    <button className={"log-button"}
                    onClick={ () => navigate('/login')}
                    >Log in</button>
            </header>
        </div>
    );
};

export default Header;