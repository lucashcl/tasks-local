import { useRef } from "react"
import { Button, type ButtonProps } from "./ui/button"

type Props = {
   onFile: (file: File) => void
   accept?: React.InputHTMLAttributes<HTMLInputElement>["accept"]
   children?: React.ReactNode | React.ReactNode[]
} & ButtonProps

export function UploadFileButton({ onFile, accept, children, ...props }: Props) {
   const fileInputRef = useRef<HTMLInputElement>(null)
   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return;
      onFile(file)
   }
   return (
      <>
         <input
            onChange={handleFile}
            accept={accept}
            ref={fileInputRef}
            type="file" name="file-upload" id="file-upload" className="hidden" />
         <Button onClick={() => {
            fileInputRef.current?.click()
         }} {...props} >
            {children}
         </Button>
      </>
   )
}