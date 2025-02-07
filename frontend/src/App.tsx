import './css/App.css'
import BookList from "./components/BookList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {BookModel} from "./models/book-model.tsx";
import {useEffect, useState} from "react";
import {searchBooks} from "./services/openLibrary.ts";

function App() {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (!query.trim()){
            setBooks([]);
            return;
        }

        searchBooks(query).then((data) => {
            if (data) setBooks(data.docs);
        });
    }, [query]);


    return (
        <>
            <div className={"container"}>
                <p>Find your books</p>
                <SearchBar onSearch={setQuery}/>
            </div>

            <div className={"books-grid"}>
                <BookList books={books}/>
            </div>
        </>
    )
}

export default App