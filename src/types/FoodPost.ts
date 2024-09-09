import {User} from "./User.ts";
import {Company} from "./Company.ts";

export type FoodPost = {
  id: string
  image: string
  title: string
  description: string
  price: number
  author: User | Company
}
