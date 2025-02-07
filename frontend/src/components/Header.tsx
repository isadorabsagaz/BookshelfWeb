import bookshelfLogo from "../assets/BookshelfIcon.svg";
import "../css/Header.css";

const Header = () => {
    return (
        <div>
            <header className="app-header">
                <img src={bookshelfLogo} alt="bookshlf icon"/>
                <p className={"title"}>Bookshelf</p>
                <button className={"log-button"}>Log in</button>
            </header>
        </div>
    );
};

export default Header;