import { useEffect, useState } from "react";

type Params<T> = {
   key: string
   initialValue: T
}

export function useLocalStorage<T>({
   key,
   initialValue
}: Params<T>) {
   const [state, setItem] = useState<T>(() => {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
   })
   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state))
   }, [state, key])
   return [state, setItem] as const
}