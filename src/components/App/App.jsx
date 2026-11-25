import styles from './App.module.scss';
import iconMoon from '@/assets/icons/icon-moon.svg';
import iconSun from '@/assets/icons/icon-sun.svg';
import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem/TodoItem.jsx';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const pluralizeItems = (count) => `${count} ${count === 1 ? 'item' : 'items'} left`;

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
  ]);
  const [newText, setNewText] = useState('');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(getInitialTheme);
  const [status, setStatus] = useState('');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);
    setTodos(arrayMove(todos, oldIndex, newIndex));
  };
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const announce = (message, nextTodos) => {
    const left = nextTodos.filter((todo) => !todo.completed).length;
    setStatus(`${message}. ${pluralizeItems(left)}.`);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const text = newText.trim();
    if (!text) return;

    const nextTodos = [...todos, { id: Date.now(), text, completed: false }];
    setTodos(nextTodos);
    setNewText('');
    announce(`Added "${text}"`, nextTodos);
  };
  const handleToggle = (id) => {
    const target = todos.find((todo) => todo.id === id);
    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(nextTodos);
    announce(`"${target.text}" marked as ${target.completed ? 'active' : 'completed'}`, nextTodos);
  };
  const handleDelete = (id) => {
    const target = todos.find((todo) => todo.id === id);
    const nextTodos = todos.filter((todo) => todo.id !== id);
    setTodos(nextTodos);
    announce(`Deleted "${target.text}"`, nextTodos);
  };
  const handleClearCompleted = () => {
    if (!todos.some((todo) => todo.completed)) return;

    const nextTodos = todos.filter((todo) => !todo.completed);
    setTodos(nextTodos);
    announce('Cleared completed todos', nextTodos);
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.hero}></div>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>TODO</h1>
          <button
            className={styles.themeButton}
            type="button"
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
          >
            <img src={theme === 'light' ? iconMoon : iconSun} alt="" />
          </button>
        </header>

        <form className={styles.newTodo} onSubmit={handleSubmit}>
          <span className={styles.circle} aria-hidden="true"></span>
          <label className={styles.srOnly} htmlFor="new-todo">
            Create a new todo
          </label>
          <input
            id="new-todo"
            className={styles.input}
            type="text"
            placeholder="Create a new todo..."
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
        </form>

        <div className={styles.card}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={visibleTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className={styles.list}>
                {visibleTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <div className={styles.footer}>
            <span>{pluralizeItems(itemsLeft)}</span>
            <div className={styles.filters}>
              {FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  className={filter === value ? styles.active : ''}
                  type="button"
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button className={styles.clear} type="button" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>
        <p className={styles.hint}>Drag and drop to reorder list</p>
        <p className={styles.srOnly} role="status">
          {status}
        </p>
      </main>
    </div>
  );
}

export default App;
