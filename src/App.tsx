import styles from './App.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { NullTasks } from './components/NullTasks'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {

  interface ITasks {
    id: string,
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
      id: uuidv4(),
      title: inputTasks,
      isComplete: false
    }

    setTasks([...tasks,newTask])

    setInputTasks('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setInputTasks(event.target.value)
  }

  function handleNewTasksInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteTask(taskToDelete: string) {
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
            onInvalid={handleNewTasksInvalid}
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
