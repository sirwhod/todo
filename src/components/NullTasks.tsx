import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './NullTasks.module.css'

export function NullTasks() {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faClipboardList} />
      <strong>
        Você ainda não tem tarefas cadastradas
      </strong>
      <span>
        Crie tarefas e organize seus itens a fazer
      </span>
    </div>
  )
}