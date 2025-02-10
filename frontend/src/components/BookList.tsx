import "../css/BookList.css"
import {BookModel} from "../models/book-model.tsx";
import noCoverImage from "../assets/noCoverImage.jpg";

type BookListProps = {
    books: BookModel[];
}

const BookList = ({books}: BookListProps) => {

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
                            <button className={"add-to-button"}>add to shelf</button>
                        </div>


                    </div>

                ))}
            </div>
        </div>
    );
};

export default BookList;