import styles from './App.module.scss';
import iconMoon from '@/assets/icons/icon-moon.svg';
import iconCheck from '@/assets/icons/icon-check.svg';
import iconCross from '@/assets/icons/icon-cross.svg';

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

        <div className={styles.card}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <button className={`${styles.circle} ${styles.circleDone}`}>
                <img src={iconCheck} alt="" />
              </button>
              <span className={`${styles.text} ${styles.textDone}`}>
                Complete online JavaScript course
              </span>
              <button className={styles.delete} type="button" aria-label="Delete">
                <img src={iconCross} alt="" />
              </button>
            </li>

            <li className={styles.item}>
              <button className={styles.circle} />
              <span className={styles.text}>Jog around the park 3x</span>
              <button className={styles.delete} aria-label="Delete">
                <img src={iconCross} alt="" />
              </button>
            </li>

            <li className={styles.item}>
              <button className={styles.circle} />
              <span className={styles.text}>10 minutes meditation</span>
              <button className={styles.delete} aria-label="Delete">
                <img src={iconCross} alt="" />
              </button>
            </li>
          </ul>

          <div className={styles.footer}>
            <span>2 items left</span>
            <div className={styles.filters}>
              <button className={styles.active} type="button">
                All
              </button>
              <button type="button">Active</button>
              <button type="button">Completed</button>
            </div>
            <button className={styles.clear}>Clear Completed</button>
          </div>
        </div>
        <p className={styles.hint}>Drag and drop to reorder list</p>
      </main>
    </div>
  );
}

export default App;
