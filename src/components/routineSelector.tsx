import { TrashIcon } from "lucide-react";
import { daily, empty, formatRoutine, type Routine, weekdays, weekends } from "../lib/routine";
import { Button } from "./ui/button";
import { Command, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

// TODO: tab index on popover content

type Props = {
   routine: Routine
   onRoutineChange: (routine: Routine) => void
}

export function RoutineSelector({ routine, onRoutineChange }: Props) {
   const [open, setOpen] = useState(false)
   const formatedRoutine = formatRoutine(routine)
   const isRoutineEmpty = routine.every((day) => day === false)
   const commandRef = useClickAway<HTMLDivElement>(() => setOpen(false))
   const handleRoutineChange = (routine: Routine) => {
      onRoutineChange(routine)
      setOpen(false)
   }
   return (
      <Popover open={open}
      >
         <PopoverTrigger asChild>
            <Button
               size="sm"
               onClick={() => setOpen(prev => !prev)}
               variant={isRoutineEmpty ? "outline" : "default"}>
               {formatedRoutine ?? "Routine"}
            </Button>
         </PopoverTrigger>
         <PopoverContent
            ref={commandRef}
            className="p-1 w-32">
            <Command>
               <CommandList>
                  <CommandItem onSelect={() => handleRoutineChange(daily)}>Daily</CommandItem>
                  <CommandItem onSelect={() => handleRoutineChange(weekdays)}>Weekdays</CommandItem>
                  <CommandItem onSelect={() => handleRoutineChange(weekends)}>Weekends</CommandItem>
                  <CommandItem
                     className="flex justify-between items-center text-red-500 aria-selected:text-red-500"
                     onSelect={() => handleRoutineChange(empty)}>
                     Clear
                     <TrashIcon />
                  </CommandItem>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}