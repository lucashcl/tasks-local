import { capitalize } from "radash";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { checkCompleted, type Task } from "../lib/task";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { TrashIcon } from "lucide-react";

type Props = {
   className?: string
   onToggle: () => void
   onRemove: () => void
} & Task

export default function TaskCard({ className, title, description, tags, completedAt, onToggle, onRemove }: Props) {
   const isCompleted = checkCompleted(completedAt)
   return (
      <ContextMenu>
         <ContextMenuTrigger>
            <Card className={cn("w-full", {
               "px-4 py-2": isCompleted,
               "p-4": !isCompleted
            }, className)}>
               <CardContent className="flex justify-between items-center p-0">
                  <div>
                     <h3 className={isCompleted ? "font-semibold text-lg text-muted-foreground" : "font-semibold text-lg"}>{capitalize(title)}</h3>
                     {!isCompleted &&
                        <>
                           <p className="text-muted-foreground">{description}</p>
                           <div className="space-x-2">
                              {tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
                           </div>
                        </>
                     }
                  </div>
                  <Checkbox
                     className="rounded-full size-8"
                     checked={isCompleted}
                     onCheckedChange={onToggle}
                  />
               </CardContent>
            </Card>
         </ContextMenuTrigger>
         <ContextMenuContent>
            <ContextMenuItem onClick={onRemove} className="flex justify-between items-center text-destructive hover:text-destructive">
               Delete
               <TrashIcon size={16} />
            </ContextMenuItem>
         </ContextMenuContent>
      </ContextMenu>
   )
}