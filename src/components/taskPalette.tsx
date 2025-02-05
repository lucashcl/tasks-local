import { useEffect, useState } from "react"
import { CommandDialog } from "./ui/command"
import { Separator } from "@radix-ui/react-separator"
import { RoutineSelector } from "./routineSelector"
import { TagsSelector } from "./tagsSelector"
import { Button } from "./ui/button"
import { empty } from "../lib/routine"
import { DialogContent, DialogTitle } from "./ui/dialog"
import type { CreateTask } from "../lib/task"
import { useTasks } from "../hooks/useTasks"

const initialTask = { title: "", description: "", routine: empty, tags: [] }

export function TaskPallete() {
   const { addTask } = useTasks()
   const [open, setOpen] = useState(false)
   useEffect(() => {
      const down = (e: KeyboardEvent) => {
         if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
         }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
   }, [])

   const [task, setTask] = useState<CreateTask>(initialTask)
   const reset = () => setTask(initialTask)
   const handleCreateTask = () => {
      if (!task.title) return
      addTask(task)
      setOpen(false)
      reset()
   }

   return (
      <CommandDialog open={open} onOpenChange={setOpen}>
         <DialogTitle className="hidden">
            Create Task command palette
         </DialogTitle>
         <DialogContent aria-describedby="Field inputs for create task command palette" className="gap-0 p-0">
            <div className="p-4 w-full">
               <input
                  value={task.title}
                  onChange={(e) => setTask(prev => ({ ...prev, title: e.target.value }))}
                  type="text"
                  placeholder="Title"
                  className="bg-background mb-1 w-full font-semibold outline-none"
                  autoComplete="off"
                  onKeyUp={(e) => {
                     if (e.key === "Enter") {
                        e.preventDefault()
                        handleCreateTask()
                     }
                  }}

               />
               <input
                  value={task.description}
                  onChange={(e) => setTask(prev => ({ ...prev, description: e.target.value }))}
                  type="text"
                  placeholder="Descrição"
                  className="bg-background w-full text-sm outline-none"
                  autoComplete="off"
               />
            </div>
            <Separator />
            <div className="flex gap-2 p-2 w-full">
               <RoutineSelector
                  routine={task.routine}
                  onRoutineChange={(routine) => setTask(prev => ({ ...prev, routine }))}
               />
               <TagsSelector tags={task.tags} onTagsChange={(tags) => {
                  setTask(prev => ({ ...prev, tags }))
               }} />
               <div className="flex-grow" />
               <Button size="sm" variant="outline" onClick={() => reset()} >Clear</Button>
               <Button type="submit" onClick={() => handleCreateTask()} size="sm" >Add</Button>
            </div>
         </DialogContent>
      </CommandDialog>
   )
}