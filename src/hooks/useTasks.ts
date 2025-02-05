import { unique } from "radash"
import { useLocalStorage } from "./useLocalStorage"
import { useEffect } from "react"
import { isSameDay } from 'date-fns'
import type { CreateTask, Task } from "../types/task"

export const checkCompleted = (completedAt: Date | null) => {
   if (!completedAt) return false
   return isSameDay(new Date(), completedAt)
}

export function useTasks() {
   const [tasks, setTasks] = useLocalStorage<Task[]>({ key: "tasks", initialValue: [] })
   const currentDate = new Date()
   const currentDayTasks = tasks.filter(task =>
      task.days.every(day => !day) ||
      task.days[currentDate.getDay()]
   )
   const completedTasks = currentDayTasks.filter(task => checkCompleted(task.completedAt))
   useEffect(() => {
      window.document.title = currentDayTasks.length ? `Tasks (${completedTasks.length}/${currentDayTasks.length})` : "Tasks"
   }, [currentDayTasks, completedTasks])
   const addTask = (task: CreateTask) => {
      setTasks(prev => [...prev, {
         id: window.crypto.randomUUID(),
         ...task,
         tags: task.tags ?? [],
         days: task.days ?? [false, false, false, false, false, false, false],
         completedAt: null,
      }])
   }

   const removeTask = (id: string) => {
      setTasks(prev => prev.filter(task => task.id !== id))
   }

   const completeTask = (id: string) => {
      const task = tasks.find(task => task.id === id)
      if (!task) return
      if (task.days.every(day => !day)) {
         removeTask(id)
         return
      }
      setTasks(prev => prev.map(task => {
         if (task.id === id) {
            return {
               ...task,
               completedAt: new Date()
            }
         }
         return task
      }))
   }

   const uncompleteTask = (id: string) => {
      setTasks(prev => prev.map(task => {
         if (task.id === id) {
            return {
               ...task,
               completedAt: null
            }
         }
         return task
      }))
   }

   const updateTask = (id: string, task: Partial<Task>) => {
      setTasks(prev => prev.map(t => {
         if (t.id === id) {
            return {
               ...t,
               ...task
            }
         }
         return t
      }))
   }

   return {
      allTasks: tasks,
      currentDayTasks,
      tags: unique(tasks.flatMap(task => task.tags)),
      progress: tasks.length ? completedTasks.length / currentDayTasks.length : 0,
      addTask,
      updateTask,
      completeTask,
      uncompleteTask,
      removeTask
   }
}