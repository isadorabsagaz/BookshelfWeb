import "../css/UserPage.css"
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import {UserModel} from "../models/user-model.tsx";
import {BookModel} from "../models/book-model.tsx";
import axios from "../services/api.ts";
import UserBookshelf from "../components/UserBookshelf.tsx";

const UserPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState<UserModel>();
    const [userBookshelf, setUserBookshelf] = useState<BookModel[]>([]);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const USER_URL = `api/user/${userId}`;
    const BOOKS_URL = `api/user/${userId}/books`;

    useEffect(() => {

        const fetchData = async () => {
            try {
                const userResponse = await axios.get(USER_URL,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    });
                setUser(userResponse.data);

                const booksResponse = await axios.get(BOOKS_URL,
                    {
                        headers: {Authorization: `Bearer ${token}`},
                    });
                console.log(booksResponse.data);
                setUserBookshelf(booksResponse.data)

            } catch (e: any) {
                console.log("Error getting user: ", e.response?.data || e.message);
            }
        };

        if (token) {
            fetchData().then()
        }
    }, [token]);

    const removeBookFromShelf = (bookKey: string) => {
        setUserBookshelf((prevBooks) =>
            prevBooks.filter((book) => book.key !== bookKey));
    };

    return (

        <div>
            <Header/>
            <Outlet/>
            <div className={"user-page-container"}>

                {user ? (
                    <div className={"user-info"}>
                        <p className={"user-name"}>{user.name}'s shelf</p>
                        <p className={"user-email"}>{user.email}</p>

                        <div>
                            <button className={"edit-button"}
                                    onClick={() => navigate('/profile')}
                            >edit</button>
                        </div>

                    </div>
                ) : (<p>User info not available</p>)}


                <div className={"books-grid"}>
                    {userBookshelf.length > 0 ? (
                        <UserBookshelf books={userBookshelf} onDelete={removeBookFromShelf}/>
                    ) : (
                        <p>Your shelf is empty... add some books to it</p>
                    )}
                </div>
            </div>

        </div>

    );
};

export default UserPage;