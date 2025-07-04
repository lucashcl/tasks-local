import { useEffect } from "react"
import { useTaskStore } from "../stores/taskStore"
import { checkCompleted } from "../lib/task"

const LOCAL_STORAGE_KEY =  "lucashcl.tasks-local.tasks"

export function useTasks() {
   const tasks = useTaskStore(state => state.tasks)
   const setTasks = useTaskStore(state => state.setTasks)
   const toggleTask = useTaskStore(state => state.toggleTask)
   const addTask = useTaskStore(state => state.addTask)
   const removeTask = useTaskStore(state => state.removeTask)
   const currentTasks = tasks.filter(task =>
      task.routine.length === 0 ||
      task.routine.every(day => !day) ||
      task.routine[new Date().getDay()] &&
       task.completedAt?.getDay() === new Date().getDay()
   ).toSorted(task => task.completedAt ? 1 : -1)
   const progress = currentTasks.filter(task => checkCompleted(task.completedAt)).length / currentTasks.length
   // Pull
   useEffect(() => {
      const tasksJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!tasksJSON) return;
      const storedTasks = JSON.parse(tasksJSON)
      setTasks(storedTasks)
   }, [setTasks])
   // Push
   useEffect(() => {
      if (tasks.length) {
         window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
      }
   }, [tasks])
   return {
      tasks,
      currentTasks,
      progress,
      addTask,
      toggleTask,
      removeTask
   }
}