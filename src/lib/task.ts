import { isSameDay } from "date-fns"
import type { Routine } from "../lib/routine"

export type Task = {
   id: string
   title: string
   description?: string
   tags: string[]
   routine: Routine
   completedAt: Date | null,
}

export type CreateTask = {
   title: string
   description?: string
   tags: string[]
   routine: Routine
}

export const checkCompleted = (completedAt: Date | null) => {
   if (!completedAt) return false
   return isSameDay(new Date(), completedAt)
}