import { Download, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { UploadFileButton } from "./uploadFileButton";
import { handleUpload } from "../lib/upload";
import { download } from "../lib/download";

export function Header({ progress }: { progress: number }) {
   return (
      <header className="flex justify-between items-center p-4">
         <div>
            <h2 className="font-semibold text-2xl">Quinta</h2>
            <Progress value={progress * 100} />
         </div>
         <div className="space-x-2">
            <Button onClick={() => {
               const blob = new Blob([window.localStorage.getItem('tasks') || ''], { type: 'application/json' })
               download(blob)
            }} variant="secondary" size="icon">
               <Download />
            </Button>
            <UploadFileButton variant="secondary" size="icon" onFile={handleUpload} accept=".json">
               <Upload />
            </UploadFileButton>
         </div>
      </header>
   )
}