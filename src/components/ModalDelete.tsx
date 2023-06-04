import styles from './ModalDelete.module.css'

interface IModalDeleteProps {
  isOpen: boolean,
  deleteTask: () => void
  closeModal: () => void
}

export function ModalDelete({isOpen, deleteTask, closeModal}: IModalDeleteProps) {

  if (isOpen) {
    return (
      <div className={styles.modalFull}>
        <div className={styles.fade} onClick={closeModal}></div>
        <div className={styles.modal}>
            <h1>Excluir Task</h1>
            <p>Você tem certeza que gostaria de excluir esta Task?</p>
            <footer>
              <button className={styles.cancel} onClick={closeModal}>
                Cancelar
              </button>
              <button className={styles.delete} onClick={deleteTask}>
                Sim, excluir
              </button>
            </footer>
        </div>
      </div>
    )
  } else {
    return null
  }

}