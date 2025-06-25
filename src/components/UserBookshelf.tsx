import "../css/BookList.css";
import "../css/UserBookshelf.css";
import { BookModel } from "../models/book-model";
import noCoverImage from "../assets/noCoverImage.jpg";
import axios from "../services/api";
import { useAuth } from "../contexts/AuthContext.tsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type BookshelfProps = {
  books: BookModel[];
  onDelete: (book: string) => void;
};

const UserBookshelf = ({ books, onDelete }: BookshelfProps) => {
  const { userId } = useAuth();
  const {t} = useTranslation()

  const handleDeleteBook = async (book: BookModel) => {
    try {
      const token = localStorage.getItem("token");

      const BOOKS_URL = `api/user/${userId}/books/${encodeURIComponent(book.key)}`;

      const response = await axios.delete(BOOKS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(book.key); //calls function from UserProfile to remove book
      toast.success("Livro removido!");
      console.log("Book removed from shelf", response.data);
    } catch (e: any) {
      toast.error("Erro ao deletar livro");
      console.log("Error removing book: ", e.response?.data || e.message);
    }
  };

  return (
    <div className={"book-container"}>
      <div className={"books-grid"}>
        {books.map((book: BookModel, index) => (
          <div className={"book"} key={index}>
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?`
                  : noCoverImage
              }
              alt={book.title}
            />

            <div className={"book-info"}>
              <p className={"title"}>{book.title}</p>
              <p className={"author"}>Autor: {book.author_name}</p>
              <p className={"year"}>{book.first_publish_year}</p>

              <div>
                <button
                  className={"delete-book-button"}
                  type="button"
                  onClick={() => handleDeleteBook(book)}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookshelf;
