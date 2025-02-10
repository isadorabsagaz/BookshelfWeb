import "../css/NotFoundPage.css"
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="not-found-page">

            <h1>404 not found!</h1>
            <Link to="/">home from link</Link>
        </div>
    );
};

export default NotFoundPage;