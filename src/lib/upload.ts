import type { Task } from "./task"

export const handleUpload = async (file: File) => {
   const content = await file.text()
   const tasks = JSON.parse(content) as Task[]
   if (!Array.isArray(tasks)) {
      console.error("Invalid file format")
      return
   }

   window.localStorage.setItem("tasks", JSON.stringify(tasks))
   window.location.reload()
}