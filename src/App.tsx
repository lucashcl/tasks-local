import { useTasks } from './hooks/useTasks'
import { Separator } from './components/ui/separator'
import TaskCard from './components/taskCard'
import { Header } from './components/header'
import { InputFooter } from './components/taskInput'

function App() {
  const { getCurrentDayTasks, addTask, checkCompleted, completeTask, uncompleteTask, progress } = useTasks()
  return (
    <main className="flex flex-col min-h-screen">
      <Header progress={progress} />
      <Separator />
      <section className='flex flex-col flex-1 gap-4 p-4'>
        {getCurrentDayTasks(new Date()).map(task => (
          <TaskCard
            key={task.id}
            title={task.name}
            description={task.description}
            isCompleted={checkCompleted(task.completedAt)}
            onToggle={() => checkCompleted(task.completedAt) ? uncompleteTask(task.id) : completeTask(task.id)}
          />
        ))}
      </section>
      <Separator />
      <InputFooter onAdd={(value) => addTask({ name: value })} />
    </main>
  )
}

export default App
