import styles from '../App/App.module.scss';
import iconCheck from '@/assets/icons/icon-check.svg';
import iconCross from '@/assets/icons/icon-cross.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS, useCombinedRefs } from '@dnd-kit/utilities';

function TodoItem({ todo, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  const setRefs = useCombinedRefs(setNodeRef, setActivatorNodeRef);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setRefs}
      style={style}
      className={`${styles.item} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
      role="listitem"
      {...listeners}
    >
      <button
        className={`${styles.circle} ${todo.completed ? styles.circleDone : ''}`}
        type="button"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'completed'}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.completed && <img src={iconCheck} alt="" />}
      </button>
      <span className={`${styles.text} ${todo.completed ? styles.textDone : ''}`}>{todo.text}</span>
      <button
        className={styles.delete}
        type="button"
        aria-label={`Delete "${todo.text}"`}
        onClick={() => onDelete(todo.id)}
      >
        <img src={iconCross} alt="" />
      </button>
    </li>
  );
}

export default TodoItem;
