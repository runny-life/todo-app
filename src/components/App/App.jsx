import styles from './App.module.scss';
import iconMoon from '@/assets/icons/icon-moon.svg';

function App() {
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

        <div className={styles.newTodo}>
          <span className={styles.circle}></span>
          <input className={styles.input} type="text" placeholder="Create a new todo..." />
        </div>
      </main>
    </div>
  );
}

export default App;
