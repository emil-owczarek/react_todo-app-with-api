/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { Book } from '../../types/Book';
import { updateBook } from '../../api/books';
import { handleError } from '../../handleError';
import { ErrorMessage } from '../../types/ErrorMessage';

type BookItemProps = {
  book: Book;
  handleDelete: (bookId: number) => void;
  onStatusChange: (bookId: number, completed: boolean) => void;
  onBookUpdate: () => void;
  isLoading: boolean;
  isDeleting: boolean;
  isToggling: boolean;
  isTogglingAll: boolean;
};

export const BookItem: React.FC<BookItemProps> = ({
  book,
  handleDelete,
  onStatusChange,
  onBookUpdate,
  isLoading,
  isDeleting,
  isToggling,
  isTogglingAll,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(book.title);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const editRef = useRef<HTMLInputElement>(null);
  const loading = book.id === 0;

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim() === '') {
      handleDelete(book.id);
    } else if (newTitle !== book.title) {
      setIsUpdating(true);
      try {
        await updateBook(book.id, {
          title: newTitle.trim(),
        });
        onBookUpdate();
        setIsEditing(false);
        setIsUpdating(false);
      } catch {
        handleError(setErrorMessage, ErrorMessage.noUpdateBook);
        setIsUpdating(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className={cn('book', { completed: book.completed })}>
      <label className="book__status-label">
        <input
          type="checkbox"
          className="book__status"
          checked={book.completed}
          onChange={() => onStatusChange(book.id, !book.completed)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="book__title-field"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
            ref={editRef}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </form>
      ) : (
        <span
          className="book__title"
          onDoubleClick={handleDoubleClick}
        >
          {book.title}
        </span>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button
        type="button"
        className="book__remove"
        onClick={() => handleDelete(book.id)}
      >
        ×
      </button>
      <div
        className={cn('modal', 'overlay', {
          'is-active':
            loading
            || isLoading
            || isUpdating
            || isDeleting
            || isToggling
            || isTogglingAll,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
