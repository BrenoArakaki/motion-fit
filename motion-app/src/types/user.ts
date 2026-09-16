export interface UserData {
  name: string
  email: string
  streak: number
  createdAt: Date
  week: {
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
    sunday: boolean
}
}