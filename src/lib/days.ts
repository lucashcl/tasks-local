export const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const
export const getCurrentDayName = () => days[new Date().getDay()]
