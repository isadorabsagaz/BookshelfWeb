import "../css/BookList.css";
import { BookModel } from "../models/book-model";
import noCoverImage from "../assets/noCoverImage.jpg";

import axios from "../services/api.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type BookListProps = {
  books: BookModel[];
};

const BookList = ({ books }: BookListProps) => {
  const { userId } = useAuth();
  const {t} = useTranslation()

  const handleAddBook = async (book: BookModel) => {
    try {
      const token = localStorage.getItem("token");

      const BOOKS_URL = `api/user/${userId}/books`;

      const response = await axios.post(BOOKS_URL, book, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Livro adicionado!");
      console.log("Book added to shelf", response.data);
    } catch (e: any) {
      toast.error("Erro ao adicionar o livro");
      console.log("Error adding book: ", e.response?.data || e.message);
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
              <p className={"author"}> {t('author')}: {book.author_name?.[0]}</p>
              <p className={"year"}>{book.first_publish_year}</p>

              <div>
                <button
                  className={"add-to-button"}
                  type="button"
                  onClick={() => handleAddBook(book)}
                >
                  {t('add')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
