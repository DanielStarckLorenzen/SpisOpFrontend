import { FoodPost } from './FoodPost.ts';
import { User } from './User.ts';

export type Company = {
  id: string;
  name: string;
  posts?: FoodPost[];
  address: string;
  managers: User[];
};
