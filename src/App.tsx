/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  USER_ID,
  addBook,
  deleteBook,
  getBooks,
  updateBook,
} from './api/books';
import { Book } from './types/Book';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Footer } from './components/Footer/Footer';
import { handleError } from './handleError';
import { ErrorMessage } from './types/ErrorMessage';
import { Filter } from './types/Filter';
import bookPic from './—Pngtree—open old books_2140422.png';
import { SidePanel } from './components/SidePanel/SidePanel';

export const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tempBook, setTempBook] = useState<Book | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isToggling, setIsToggling] = useState<boolean>(false);
  const [isTogglingAll, setIsTogglingAll] = useState<boolean>(false);

  const counter = () => {
    return books.filter((book) => !book.completed).length;
  };

  const visibleBooks = () => {
    const visible = [...books].filter((book) => {
      if (filter === 'Active' && book.completed) {
        return false;
      }

      if (filter === 'Completed' && !book.completed) {
        return false;
      }

      return true;
    });

    return visible;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!title.trim()) {
      handleError(setErrorMessage, ErrorMessage.noTitle);

      return;
    }

    const newBook = {
      id: 0,
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    };

    setTempBook(newBook);

    setIsLoading(true);
    addBook(newBook)
      .then((response) => {
        setTitle('');
        setBooks((oldBooks) => [...oldBooks, response]);
      })
      .catch(() => {
        handleError(setErrorMessage, ErrorMessage.noAddBook);
      })
      .finally(() => {
        setIsLoading(false);
        setTempBook(null);
      });
  };

  const handleDelete = (bookId: number) => {
    setIsDeleting(true);
    deleteBook(bookId)
      .then(() => {
        setBooks((oldBooks) => oldBooks.filter((book) => book.id !== bookId));
      })
      .catch(() => {
        handleError(setErrorMessage, ErrorMessage.noDeleteBook);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleToggleAll = () => {
    const areAllCompleted = books.every((book) => book.completed);
    const updatedBooks = books.map((book) => ({
      ...book,
      completed: !areAllCompleted,
    }));

    setIsTogglingAll(true);
    Promise.all(
      updatedBooks.map((book) => updateBook(book.id, { completed: book.completed })),
    )
      .then(() => {
        setBooks(updatedBooks);
      })
      .catch(() => {
        handleError(setErrorMessage, ErrorMessage.noUpdateBook);
      })
      .finally(() => {
        setIsTogglingAll(false);
      });
  };

  const handleStatusChange = (bookId: number, completed: boolean) => {
    setIsToggling(true);
    updateBook(bookId, { completed })
      .then((updatedBook) => {
        setBooks((prevBooks) => prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
      })
      .catch(() => {
        handleError(setErrorMessage, ErrorMessage.noUpdateBook);
      })
      .finally(() => {
        setIsToggling(false);
      });
  };

  const handleClearCompleted = () => {
    const completedBooks = books.filter((book) => book.completed);

    Promise.all(completedBooks.map((book) => deleteBook(book.id)))
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => !book.completed));
      })
      .catch(() => {
        handleError(setErrorMessage, ErrorMessage.noDeleteBook);
      });
  };

  useEffect(() => {
    getBooks(USER_ID)
      .then((book) => {
        setBooks(book);
        setTitle('');
      })
      .catch(() => {
        handleError(setErrorMessage, ErrorMessage.noBooks);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="books-to-read">
      <img className="image" src={bookPic} alt="dd" />

      <div className="books-to-read__content">
        <Header
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
          books={books}
          isLoading={isLoading}
          onToggleAll={handleToggleAll}
        />
        {books.length > 0 && (
          <List
            books={visibleBooks()}
            tempBook={tempBook}
            handleDelete={handleDelete}
            onStatusChange={handleStatusChange}
            setBooks={setBooks}
            isLoading={isLoading}
            isDeleting={isDeleting}
            isToggling={isToggling}
            isTogglingAll={isTogglingAll}
          />
        )}
        {books.length > 0 && (
          <Footer
            counter={counter()}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={handleClearCompleted}
            books={books}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${
          !errorMessage && 'hidden'
        }`}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
          aria-label="Close error notification"
        />
        {errorMessage}
        <br />
      </div>
      <SidePanel />
    </div>
  );
};
