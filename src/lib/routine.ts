import { compare } from "./arrayUtils";
import { days } from "./days";

export type Routine = [boolean, boolean, boolean, boolean, boolean, boolean, boolean]

export const weekdays = [false, true, true, true, true, true, false] as Routine
export const weekends = [true, false, false, false, false, false, true] as Routine
export const daily = [true, true, true, true, true, true, true] as Routine
export const empty = [false, false, false, false, false, false, false] as Routine

export function formatRoutine(routine: Routine): string | undefined {
   if (routine.every(day => day)) return "Daily";
   if (routine.every(day => !day)) return;
   if (compare(routine, weekends)) return "Weekends";
   if (compare(routine, weekdays)) return "Weekdays";
   const activeDays = routine.filter(day => day)
   if (activeDays.length === 1) return days[routine.indexOf(true)];
   return activeDays.map((_, i) => days[i][0]).join("|")
}

// Daily, Weekdays, Weekends, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, M|W|F