import {User} from "./User.ts";
import {Company} from "./Company.ts";

export type FoodPost = {
  id: string
  image: string
  title: string
  description: string
  price: number
  author: User | Company
  createdAt: Date
  lastUpdated: Date
  type: 'company' | 'community'
}

export type newFoodPost = {
    title: string
    description: string
    image: string
    price: number
    author: User | Company
    type: 'company' | 'community'
    allergies?: string[]
    spaceId: number
}
