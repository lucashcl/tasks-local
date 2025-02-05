import { useState } from "react"
import { Badge } from "./ui/badge"
import { X } from "lucide-react"
import { unique } from "radash"
import { cn } from "../lib/utils"

type Props = {
   tags: string[]
   onTagsChange: (tags: string[]) => void
}

export function TagsSelector({
   tags,
   onTagsChange
}: Props) {
   const [input, setInput] = useState("")
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         e.preventDefault()
         onTagsChange(unique([...tags, input.trim()]))
         setInput("")
      }
      if (e.key === "Backspace" && input === "") {
         onTagsChange(tags.slice(0, -1))
      }
   }

   const handleRemoveTag = (tag: string) => {
      onTagsChange(tags.filter(t => t !== tag))
   }

   return (
      <div
         className="relative flex items-center gap-1 border-input bg-background px-2 border rounded-md font-medium text-xs">
         {tags.map(tag => <Badge
            className="flex items-center gap-1"
            variant="secondary"
            key={tag}>{tag}
            <X size={12} className="text-muted-foreground hover:text-foreground transition cursor-pointer" onClick={() => handleRemoveTag(tag)} />
         </Badge>

         )}
         <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={tags.length === 0 ? "Tags" : "Add"}
            className={cn(
               "bg-transparent outline-none w-16 ",
               { "w-8 ml-1": tags.length > 0 }
            )}
            onKeyDown={handleKeyDown}
         />
      </div>
   )
}