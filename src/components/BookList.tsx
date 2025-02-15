import "../css/BookList.css"
import {BookModel} from "../models/book-model";
import noCoverImage from "../assets/noCoverImage.jpg";
import axios from "../services/api";

type BookListProps = {
    books: BookModel[];
}

const BookList = ({books}: BookListProps) => {

    const handleAddBook = async (book:BookModel) => {

        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");

            const BOOKS_URL = `api/user/${userId}/books`;

            const response = await axios.post(BOOKS_URL,
                JSON.stringify(book),
                {
                    headers: {Authorization: `Bearer ${token}`},
                });

            console.log("Book added to shelf", response.data)
        } catch (e:any) {
            console.log("Error adding book: ", e.response?.data || e.message)
        }
    }

    return (
        <div className={"book-container"}>
            <div className={"books-grid"}>
                {books.map((book: BookModel, index) => (

                    <div className={"book"} key={index}>

                        <img src={book.cover_i
                            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?`
                            : noCoverImage}
                             alt={book.title}
                        />

                        <div className={"book-info"}>
                            <p className={"title"}>{book.title}</p>
                            <p className={"author"}>Author: {book.author_name?.[0]}</p>
                            <p className={"year"}>{book.first_publish_year}</p>


                            <button className={"add-to-button"}
                                    type="button"
                                    onClick={() => handleAddBook(book)}
                            >add to shelf
                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;