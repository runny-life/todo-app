import styles from './App.module.scss';
import iconMoon from '@/assets/icons/icon-moon.svg';
import iconCheck from '@/assets/icons/icon-check.svg';
import iconCross from '@/assets/icons/icon-cross.svg';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
  ]);
  const [newText, setNewText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = newText.trim();
    if (!text) return;

    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setNewText('');
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className={styles.page}>
      <div className={styles.hero}></div>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>TODO</h1>
          <button className={styles.themeButton} type="button" aria-label="Toggle theme">
            <img src={iconMoon} alt="" />
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
            {todos.map((todo) => (
              <li className={styles.item} key={todo.id}>
                <button
                  className={`${styles.circle} ${todo.completed ? styles.circleDone : ''}`}
                  type="button"
                  aria-label="Toggle todo"
                >
                  {todo.completed && <img src={iconCheck} alt="" />}
                </button>
                <span className={`${styles.text} ${todo.completed ? styles.textDone : ''}`}>
                  {todo.text}
                </span>
                <button className={styles.delete} type="button" aria-label="Delete">
                  <img src={iconCross} alt="" />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <span>{itemsLeft} items left</span>
            <div className={styles.filters}>
              <button className={styles.active} type="button">
                All
              </button>
              <button type="button">Active</button>
              <button type="button">Completed</button>
            </div>
            <button className={styles.clear} type="button">
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
