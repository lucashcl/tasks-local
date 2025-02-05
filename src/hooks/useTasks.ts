import { useEffect } from "react"
import { useTaskStore } from "../stores/taskStore"

export function useTasks() {
   const tasks = useTaskStore(state => state.tasks)
   const setTasks = useTaskStore(state => state.setTasks)
   const toggle = useTaskStore(state => state.toggleTask)
   const addTask = useTaskStore(state => state.addTask)
   const currentTasks = tasks.filter(task =>
      task.routine.length === 0 ||
      task.routine.every(day => !day) ||
      task.routine[new Date().getDay()]
   )
   // Pull
   useEffect(() => {
      const tasksJSON = window.localStorage.getItem('tasks')
      if (!tasksJSON) return;
      const storedTasks = JSON.parse(tasksJSON)
      setTasks(storedTasks)
   }, [setTasks])
   // Push
   useEffect(() => {
      if (tasks.length) {
         window.localStorage.setItem('tasks', JSON.stringify(tasks))
      }
   }, [tasks])
   return {
      tasks,
      currentTasks,
      addTask,
      toggle
   }
}