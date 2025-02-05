import { Separator } from './components/ui/separator'
import TaskCard from './components/taskCard'
import { Header } from './components/header'
import { TaskPallete } from './components/taskPalette'
import { useTasks } from './hooks/useTasks'

function App() {
  const { currentTasks, toggle } = useTasks()
  return (
    <main className="flex flex-col min-h-screen">
      <TaskPallete />
      <Header progress={0} />
      <Separator />
      <section className='flex flex-col flex-1 gap-4 p-4'>
        {currentTasks.map(task => (
          <TaskCard
            key={task.id}
            {...task}
            onToggle={() => toggle(task.id)}
          />
        ))}
      </section>
      <div className='justify-center items-center p-4 w-full'>
        <kbd className="inline-flex items-center gap-1 bg-muted opacity-100 px-1.5 border rounded h-5 font-medium font-mono text-[10px] text-muted-foreground pointer-events-none select-none">
          <span className="text-xs">Ctrl </span>+ K
        </kbd>
      </div>
    </main>
  )
}

export default App
