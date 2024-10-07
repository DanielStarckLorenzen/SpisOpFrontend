import { FoodPost } from './FoodPost.ts';
import { Organization } from './Organization.ts';
import { User } from './User.ts';

export type Company = Organization & {
  posts?: FoodPost[];
  address: string;
  managers: User[];
  description: string;
};
