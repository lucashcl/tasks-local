import { checkCompleted, useTasks } from './hooks/useTasks'
import { Separator } from './components/ui/separator'
import TaskCard from './components/taskCard'
import { Header } from './components/header'
import { TaskInput } from './components/taskInput'

function App() {
  const { currentDayTasks, addTask, completeTask, uncompleteTask, progress } = useTasks()
  return (
    <main className="flex flex-col min-h-screen">
      <Header progress={progress} />
      <Separator />
      <section className='flex flex-col flex-1 gap-4 p-4'>
        {currentDayTasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
            onToggle={() => checkCompleted(task.completedAt) ? uncompleteTask(task.id) : completeTask(task.id)}
          />
        ))}
      </section>
      <Separator />
      <TaskInput onCreateTask={addTask} />
    </main>
  )
}

export default App
