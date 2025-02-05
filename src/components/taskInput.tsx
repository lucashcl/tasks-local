import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { RoutineSelector } from "./routineSelector";
import { empty, type Routine } from "../lib/routine";
import { useState } from "react";
import { TagsSelector } from "./tagsSelector";

type Props = {
   onCreateTask: (data: Inputs) => void
   disabled?: boolean
}

type Inputs = {
   title: string;
   description: string;
   routine: Routine;
   tags: string[];
}

const initialTask = { title: "", description: "", routine: empty, tags: [] }

export function TaskInput({ onCreateTask, disabled = false }: Props) {
   const [task, setTask] = useState<Inputs>(initialTask)
   const reset = () => setTask(initialTask)
   const handleCreateTask = () => {
      onCreateTask(task)
      console.log(task)
      reset()
   }
   return (
      <div
         onSubmit={(e) => {
            e.preventDefault()
            onCreateTask(task)
         }}
         className='justify-between items-center'>
         <div className="p-4 w-full">
            <input
               disabled={disabled}
               value={task.title}
               onChange={(e) => setTask(prev => ({ ...prev, title: e.target.value }))}
               type="text"
               placeholder="Title"
               className="bg-background mb-1 w-full font-semibold outline-none"
               autoComplete="off"
            />
            <input
               disabled={disabled}
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
            <Button type="submit" onClick={() => handleCreateTask()} disabled={disabled} size="sm" >Add</Button>
         </div>
      </div>
   )
}