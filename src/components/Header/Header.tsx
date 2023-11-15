import cn from 'classnames';

import { Book } from '../../types/Book';

type HeaderProps = {
  title: string;
  setTitle: (string: string) => void;
  handleSubmit: (event: { preventDefault: () => void }) => void;
  books: Book[];
  isLoading: boolean;
  onToggleAll: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  setTitle,
  handleSubmit,
  books,
  isLoading,
  onToggleAll,
}) => {
  return (
    <header className="books-to-read__header">
      {books.length > 0 && (
        <button
          type="button"
          className={cn('books-to-read__toggle-all', {
            active: books.every((book) => book.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
          aria-label="toggle-all button"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="books-to-read__new-book"
          placeholder="Add a title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          disabled={isLoading}
          ref={(input) => input && input.focus()}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </form>
    </header>
  );
};
