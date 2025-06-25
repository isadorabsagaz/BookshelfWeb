import "./css/App.css";
import BookList from "./components/BookList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import { BookModel } from "./models/book-model.tsx";
import { useEffect, useState } from "react";
import { searchBooks } from "./services/openLibrary.ts";
import Header from "./components/Header.tsx";
import { Outlet } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function App() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    searchBooks(query).then((data) => {
      if (data) setBooks(data.docs);
    });
  }, [query]);

  return (
    <>
      <div>
        <Header />
        <Outlet />
        <div className={"app-container"}>
          <p>{t('find_books')}</p>
          <SearchBar onSearch={setQuery} />
        </div>

        <div className={"books-grid"}>
          <BookList books={books} />
        </div>
      </div>
    </>
  );
}

export default App;
