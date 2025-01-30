import { cn } from "../lib/utils";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

type Props = {
   className?: string
   title: string
   description?: string
   isCompleted: boolean
   onToggle: () => void
}

export default function TaskCard({ className, title, description, isCompleted, onToggle }: Props) {
   return (
      <Card className={cn("p-4 w-full", className)}>
         <CardContent className="flex justify-between items-center p-0">
            <div>
               <h3 className="font-semibold text-lg">{title}</h3>
               <p className="text-muted-foreground">
                  {description}
               </p>
            </div>
            <Checkbox
               className="rounded-full size-8"
               checked={isCompleted}
               onCheckedChange={onToggle}
            />
         </CardContent>
      </Card>
   )
}