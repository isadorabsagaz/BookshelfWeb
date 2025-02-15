import "../css/UserProfile.css"
import  {useEffect, useState} from 'react';
import {UserModel} from "../models/user-model.tsx";
import {BookModel} from "../models/book-model.tsx";
import axios from "../services/api.ts";
import BookList from "./BookList.tsx";

const UserProfile = () => {

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
                setUserBookshelf(booksResponse.data)

            } catch (e:any) {
                console.log("Error getting user: ", e.response?.data || e.message);
            }
        };

        if(token) { fetchData().then() }
    }, [token]);

    return (
        <div>
            {user ? (
                <div className={"user-info"}>
                    <p>{user.name}'s shelf</p>
                    <p>{user.email}</p>
                </div>
            ) : (<p>User info not available</p>)}

            <div className={"edit-button"}>
                <button>edit</button>
            </div>

            <div className={"books-grid"}>
                {userBookshelf.length > 0 ? (
                    <BookList books={userBookshelf}></BookList>
                ) : (
                    <p>Your shelf is empty... add some books to it</p>
                )}
            </div>
        </div>
    );
};

export default UserProfile;