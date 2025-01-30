import { SendHorizonal } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const keyHandler = (key: React.KeyboardEvent<HTMLInputElement>["key"], callback: () => void) => {
   return (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === key) {
         callback()
      }
   }
}

const bind = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => ({
   value,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
})

export function InputFooter({ onAdd }: { onAdd: (name: string) => void }) {
   const [value, setValue] = useState('')
   const handleAdd = () => {
      if (value.trim()) {
         onAdd(value)
         setValue('')
      }
   }
   return (
      <div className='flex justify-between items-center gap-4 p-4'>
         <Input  {...bind(value, setValue)} placeholder="Add task" onKeyUp={keyHandler("Enter", handleAdd)} />
         <Button onClick={handleAdd} size="icon">
            <SendHorizonal />
         </Button>
      </div>
   )
}