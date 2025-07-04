import { Separator } from './components/ui/separator'
import TaskCard from './components/taskCard'
import { Header } from './components/header'
import { TaskPallete } from './components/taskPalette'
import { useTasks } from './hooks/useTasks'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { SendHorizonal } from 'lucide-react'

function App() {
  const { currentTasks, progress, toggleTask, removeTask } = useTasks()
  return (
    <main className="flex flex-col min-h-screen relative">
      <TaskPallete />
      <Header progress={progress} />
        {
            currentTasks.length > 0 ?
                <section className='flex flex-col flex-1 gap-4 p-4 h-full mx-80'>
                    {currentTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            {...task}
                            onToggle={() => toggleTask(task.id)}
                            onRemove={() => removeTask(task.id)}
                        />
                    ))}
                </section>
                :
                <div className="w-full h-full flex items-center justify-center my-auto">
                    <p className="text-muted-foreground text-sm text-center ">
                        Press{" "}
                        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                            <span className="text-xs">Ctrl + </span>K
                        </kbd>
                        {" "}to
                        <br/>
                        add a new task
                    </p>
                </div>
        }
      <div className='lg:hidden'>
        <Separator />
        <div className='flex gap-2 p-2'>
          <Input placeholder='Add quick task' />
          <Button size="icon">
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App
