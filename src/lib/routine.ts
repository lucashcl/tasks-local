import { compare } from "./arrayUtils";
import { days } from "./days";

export type Routine = [boolean, boolean, boolean, boolean, boolean, boolean, boolean] | []

export const weekdays: Routine = [false, true, true, true, true, true, false]
export const weekends: Routine = [true, false, false, false, false, false, true]
export const daily: Routine = [true, true, true, true, true, true, true]
export const empty: Routine = []

export function formatRoutine(routine: Routine): string | undefined {
   if (!routine.length) return;
   if (routine.every(day => day)) return "Daily";
   if (routine.every(day => !day)) return;
   if (compare(routine, weekends)) return "Weekends";
   if (compare(routine, weekdays)) return "Weekdays";
   const activeDays = routine.filter(day => day)
   if (activeDays.length === 1) return days[routine.indexOf(true)];
   return activeDays.map((_, i) => days[i][0]).join("|")
}

// Daily, Weekdays, Weekends, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, M|W|F