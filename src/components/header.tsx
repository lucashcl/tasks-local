import { Download, SettingsIcon, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { UploadFileButton } from "./uploadFileButton";
import { handleUpload } from "../lib/upload";
import { download } from "../lib/download";
import { getCurrentDayName } from "../lib/days";
import { capitalize } from "radash";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";

export function Header({ progress }: { progress: number }) {
   return (
      <header className="flex justify-between items-center p-4">
         <div className="space-y-1 min-w-24">
            <h2 className="font-semibold text-2xl">{capitalize(getCurrentDayName())}</h2>
            <Progress value={progress * 100} />
         </div>
         <div>
            <Dialog>
               <DialogTrigger asChild>
                  <Button size="icon" variant="secondary">
                     <SettingsIcon />
                  </Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogTitle>
                     Settings
                  </DialogTitle>
                  <div className="flex flex-col gap-2">
                     <Label>Export data</Label>
                     <Button onClick={() => {
                        const blob = new Blob([window.localStorage.getItem('tasks') || ''], { type: 'application/json' })
                        download(blob)
                     }} variant="secondary" >
                        Download data
                        <Download />
                     </Button>
                     <Label>Import data</Label>
                     <UploadFileButton variant="secondary" onFile={handleUpload} accept=".json">
                        Upload data
                        <Upload />
                     </UploadFileButton>
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </header>
   )
}
