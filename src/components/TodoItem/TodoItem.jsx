import styles from '../App/App.module.scss';
import iconCheck from '@/assets/icons/icon-check.svg';
import iconCross from '@/assets/icons/icon-cross.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TodoItem({ todo, onToggle, onDelete }) {
  const { listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`${styles.item} ${isDragging ? styles.dragging : ''}`}
      {...listeners}
    >
      <button
        className={`${styles.circle} ${todo.completed ? styles.circleDone : ''}`}
        type="button"
        aria-label="Toggle todo"
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <img src={iconCheck} alt="" />}
      </button>
      <span className={`${styles.text} ${todo.completed ? styles.textDone : ''}`}>{todo.text}</span>
      <button
        className={styles.delete}
        type="button"
        aria-label="Delete"
        onClick={() => onDelete(todo.id)}
      >
        <img src={iconCross} alt="" />
      </button>
    </li>
  );
}

export default TodoItem;
