import styles from './App.module.scss';
import iconMoon from '@/assets/icons/icon-moon.svg';
import iconCheck from '@/assets/icons/icon-check.svg';
import iconCross from '@/assets/icons/icon-cross.svg';
import iconSun from '@/assets/icons/icon-sun.svg';
import { useEffect, useState } from 'react';

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  });

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const text = newText.trim();
    if (!text) return;

    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setNewText('');
  };
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
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
          <span className={styles.circle}></span>
          <input
            className={styles.input}
            type="text"
            placeholder="Create a new todo..."
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
        </form>

        <div className={styles.card}>
          <ul className={styles.list}>
            {visibleTodos.map((todo) => (
              <li className={styles.item} key={todo.id}>
                <button
                  className={`${styles.circle} ${todo.completed ? styles.circleDone : ''}`}
                  type="button"
                  aria-label="Toggle todo"
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.completed && <img src={iconCheck} alt="" />}
                </button>
                <span className={`${styles.text} ${todo.completed ? styles.textDone : ''}`}>
                  {todo.text}
                </span>
                <button
                  className={styles.delete}
                  type="button"
                  aria-label="Delete"
                  onClick={() => handleDelete(todo.id)}
                >
                  <img src={iconCross} alt="" />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <span>{itemsLeft} items left</span>
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
      </main>
    </div>
  );
}

export default App;
