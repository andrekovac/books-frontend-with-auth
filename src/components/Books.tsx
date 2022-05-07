import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type Book = {
  title: string;
  language: string;
};

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [accessToken] = useLocalStorage("accessToken", "");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://127.0.0.1:8000/books", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <h1>All Books</h1>
      <div>
        {books.length > 0 ? (
          books.map((book) => {
            return <p key={book.title}>{book.title}</p>;
          })
        ) : (
          <div>There are no books</div>
        )}
      </div>
    </>
  );
};

export default Books;
