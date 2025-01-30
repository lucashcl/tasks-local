import { unique } from "radash"
import { useLocalStorage } from "./useLocalStorage"
import { useEffect } from "react"
import { isSameDay } from 'date-fns'

type Days = [boolean, boolean, boolean, boolean, boolean, boolean, boolean]

export type Task = {
   id: string
   name: string
   description?: string
   tags: string[]
   days: Days
   completedAt: Date | null,
}

type CreateTask = {
   name: string
   description?: string
   tags?: string[]
   days?: Days
}

export function useTasks() {
   const [tasks, setTasks] = useLocalStorage<Task[]>({ key: "tasks", initialValue: [] })
   const checkCompleted = (completedAt: Date | null) => {
      if (!completedAt) return false
      return isSameDay(new Date(), completedAt)
   }
   const completedTasks = tasks.filter(task => checkCompleted(task.completedAt))
   useEffect(() => {
      window.document.title = tasks.length ? `Tasks (${completedTasks.length}/${tasks.length})` : "Tasks"
   }, [tasks, completedTasks])
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

   return {
      tasks,
      getCurrentDayTasks: (day: Date) => tasks.filter(task => task.days.every(day => !day) || task.days[day.getDay()]),
      tags: unique(tasks.flatMap(task => task.tags)),
      progress: tasks.length ? completedTasks.length / tasks.length : 0,
      checkCompleted,
      addTask,
      removeTask,
      completeTask,
      uncompleteTask
   }
}