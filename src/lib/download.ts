export function download(blob: Blob) {
   const blobURL = URL.createObjectURL(blob)
   const link = document.createElement('a')
   link.href = blobURL
   link.download = 'tasks.json'
   link.click()
   URL.revokeObjectURL(blobURL)
   link.remove()
}