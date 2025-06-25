import "../css/UserPage.css";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { UserModel } from "../models/user-model";
import { BookModel } from "../models/book-model";
import UserBookshelf from "../components/UserBookshelf";
import { useAuth } from "../contexts/AuthContext.tsx";
import axios from "../services/api";
import { useTranslation } from "react-i18next";

const UserPage = () => {
  const navigate = useNavigate();
  const { userId, logout } = useAuth();
  const {t} = useTranslation()

  const [user, setUser] = useState<UserModel>();
  const [userBookshelf, setUserBookshelf] = useState<BookModel[]>([]);

  const token = localStorage.getItem("token");

  const USER_URL = `api/user/${userId}`;
  const BOOKS_URL = `api/user/${userId}/books`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(USER_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        const booksResponse = await axios.get(BOOKS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserBookshelf(booksResponse.data);
      } catch (e: any) {
        console.log("Error getting user: ", e.response?.data || e.message);

        //invalid token
        if (e.response?.status === 401 || e.response?.status === 403) {
          logout();
          navigate("/login");
        }
      }
    };

    if (token && userId) {
      fetchData().then();
    } else {
      navigate("/");
    }
  }, [token, userId, logout, navigate]);

  const removeBookFromShelf = (bookKey: string) => {
    setUserBookshelf((prevBooks) =>
      prevBooks.filter((book) => book.key !== bookKey),
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <Header />
      <Outlet />

      <div className={"user-page-container"}>
        {user ? (
          <div className={"user-info"}>
            <p className={"user-name"}>{t('shelf')}"{user.name}"</p>
            <p className={"user-email"}>{user.email}</p>

            <div className={"buttons"}>
              <button
                className={"edit-button"}
                onClick={() => navigate("/user/profile")}
              >
                {t('edit_button')}
              </button>

              <button className={"edit-button"} onClick={handleLogout}>
                {t('exit_button')}
              </button>
            </div>
          </div>
        ) : (
          <p>{t('loading_user')}</p>
        )}

        <div className={"books-grid"}>
          {userBookshelf.length > 0 ? (
            <UserBookshelf
              books={userBookshelf}
              onDelete={removeBookFromShelf}
            />
          ) : (
            <p>{t('empty_shelf')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
