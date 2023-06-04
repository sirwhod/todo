import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './Task.module.css'
import { useState } from "react";
import { ModalDelete } from "./modalDelete";

interface ITask {
  id: string,
  title: string,
  isComplete: boolean
}

interface ITaskProps {
  task: ITask,
  onDeleteTask: (comment: string) => void,
  onUpdateTask: (task: ITask) => void
}

export function Task({task, onDeleteTask, onUpdateTask }: ITaskProps) {

  const { id, title } = task

  console.log(task.isComplete)
  
  const [checkButton, setCheckButton] = useState(styles.taskContainer)
  const [openModal, setOpenModal] = useState(false)

  function handleOpenModal() {
    setOpenModal(!openModal)
  }

  function handleCheckButton() {
    if (checkButton === styles.taskContainer) {
      setCheckButton(styles.checkedContainer)
      handleCompleteToggle()
    } else {
      setCheckButton(styles.taskContainer)
      handleCompleteToggle()
    }
  }

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  const handleCompleteToggle = () => {
    const updatedTask = { ...task, isComplete: !task.isComplete };
    onUpdateTask(updatedTask);
  };

  return (
    <div className={checkButton}>
      <button
        onClick={handleCheckButton}
        className={styles.checkButton}
      >
       <FontAwesomeIcon icon={faCheck} />
      </button>
      <p>{title}</p>
      <button 
        className={styles.deleteButton}
        onClick={handleOpenModal}
      >
        <FontAwesomeIcon icon={faTrash} /></button>
        <ModalDelete isOpen={openModal} deleteTask={handleDeleteTask} closeModal={handleOpenModal}/>
    </div>
  )
}