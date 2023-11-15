import { USER_ID, getBooks } from '../../api/books';
import { Book } from '../../types/Book';
import { BookItem } from '../Item/BookItem';

type ListProps = {
  books: Book[];
  tempBook: Book | null;
  handleDelete: (bookId: number) => void;
  onStatusChange: (bookId: number, completed: boolean) => void;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  isLoading: boolean;
  isDeleting: boolean;
  isToggling: boolean;
  isTogglingAll: boolean;
};

export const List: React.FC<ListProps> = ({
  books,
  tempBook,
  handleDelete,
  onStatusChange,
  setBooks,
  isLoading,
  isDeleting,
  isToggling,
  isTogglingAll,
}) => {
  const reloadBooks = async () => {
    const reloadedBooks = await getBooks(USER_ID);

    setBooks(reloadedBooks);
  };

  return (
    <section className="books-to-read__main">
      {books.map((book) => {
        return (
          <BookItem
            key={book.id}
            book={book}
            handleDelete={handleDelete}
            onStatusChange={onStatusChange}
            onBookUpdate={reloadBooks}
            isLoading={isLoading}
            isDeleting={isDeleting}
            isToggling={isToggling}
            isTogglingAll={isTogglingAll}
          />
        );
      })}
      {tempBook && (
        <BookItem
          book={tempBook}
          handleDelete={handleDelete}
          onStatusChange={onStatusChange}
          onBookUpdate={reloadBooks}
          isLoading={isLoading}
          isDeleting={isDeleting}
          isToggling={isToggling}
          isTogglingAll={isTogglingAll}
        />
      )}
    </section>
  );
};
