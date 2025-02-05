import { create } from 'zustand'
import { checkCompleted, type CreateTask, type Task } from '../lib/task'

type TaskStore = {
   tasks: Task[],
   setTasks: (tasks: Task[]) => void,
   addTask: (task: CreateTask) => void,
   toggleTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
   tasks: [],
   setTasks: (tasks: Task[]) => set({ tasks }),
   addTask: (task: CreateTask) => set({
      tasks: [...get().tasks, {
         id: window.crypto.randomUUID(),
         ...task,
         tags: task.tags ?? [],
         routine: task.routine ?? [],
         completedAt: null,
      }]
   }),
   toggleTask: (id: string) => set({
      tasks: get().tasks.map(task => {
         if (task.id === id) {
            const completed = checkCompleted(task.completedAt)
            if (completed) {
               return {
                  ...task,
                  completedAt: null
               }
            }
            return {
               ...task,
               completedAt: new Date()
            }
         }
         return task
      })
   }),
}))