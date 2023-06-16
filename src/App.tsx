import styles from './App.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { NullTasks } from './components/NullTasks'
import { Task } from './components/Task'
import { FormEvent, SetStateAction, useState } from 'react'

function App() {

  interface ITasks {
    id: number,
    title: string,
    isComplete: boolean,
  }

  const [ tasks, setTasks ] = useState<ITasks[]>([]);
  const [ inputTasks, setInputTasks] = useState('')

  const countTasks = tasks.length

  const sumCompletedTasks = tasks.reduce((accumulator, task) => {
    if (task.isComplete) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  const updateTask = (updatedTask: ITasks) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: new Date().getMilliseconds(),
      title: inputTasks,
      isComplete: false
    }

    setTasks([...tasks,newTask])

    setInputTasks('')
  }

  function handleNewTaskChange(event: { target: { setCustomValidity: (arg0: string) => void; value: SetStateAction<string> } }) {
    event.target.setCustomValidity('')
    setInputTasks(event.target.value)
  }

  function deleteTask(taskToDelete: number) {
    const TaskWithouDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })

    setTasks(TaskWithouDeletedOne)
  }

  return (
    <div className={styles.body}>
      <header>
        <img src="/logo-todo.svg" alt="Logo Todo List" />
        <div className={styles.name}>
          <span>to</span>
          <strong>do</strong>
        </div>
      </header>
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask}>
          <input 
            type="text"
            name="newTask"
            onChange={handleNewTaskChange}
            placeholder='Adicione uma nova tarefa'
            value={inputTasks}
            required
          />
          <button type='submit'>
            <span>Criar</span>
            <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </form>
        <div className={styles.content}>
          <header className={styles.headerTasks}>
            <div className={styles.created}>
              <strong>Tarefas criadas</strong>
              <span>{countTasks}</span>
            </div>
            <div className={styles.completed}>
              <strong>Concluídas</strong>
              <span>{`${sumCompletedTasks} de ${countTasks}`}</span>
            </div>
          </header>
          <div className={styles.tasks}>
            {
              tasks.length === 0 ? (
                <NullTasks />
              ) : (
                <div>
                  {tasks.map(task => {
                    return <Task 
                      key={task.id} 
                      task={task} 
                      onDeleteTask={deleteTask}
                      onUpdateTask={updateTask}
                    />;
                  })}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
