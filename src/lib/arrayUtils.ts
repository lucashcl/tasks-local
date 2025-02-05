export function compare<T>(arr1: T[], arr2: T[]): boolean {
   return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
}