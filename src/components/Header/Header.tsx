import cn from 'classnames';

import { Book } from '../../types/Todo';

type HeaderProps = {
  title: string;
  setTitle: (string: string) => void;
  handleSubmit: (event: { preventDefault: () => void }) => void;
  todos: Book[];
  isLoading: boolean;
  onToggleAll: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  setTitle,
  handleSubmit,
  todos,
  isLoading,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all',
            { active: todos.every(todo => todo.completed) })}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
          aria-label="toggle-all button"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
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
