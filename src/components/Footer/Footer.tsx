import cn from 'classnames';
import { Book } from '../../types/Book';
import { Filter } from '../../types/Filter';

type FooterProps = {
  counter: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  onClearCompleted: () => void;
  books: Book[];
};

export const Footer: React.FC<FooterProps> = ({
  counter,
  filter,
  setFilter,
  onClearCompleted,
  books,
}) => {
  return (
    <footer className="books-to-read__footer" data-cy="Footer">
      <span className="book-count">
        {`${counter} books left`}
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'All' })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'Active' })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('Active')}
        >
          To read
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'Completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('Completed')}
        >
          Completed
        </a>
      </nav>
      {books.some((book) => book.completed) && (
        <button
          type="button"
          className="books-to-read__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
