import { User } from './User.ts';
import { Company } from './Company.ts';
import { Organization } from './Organization.ts';

export type FoodPost = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  authorUser: User;
  organization: Organization;
  lastUpdated: Date;
};

export type newFoodPost = {
  title: string;
  description: string;
  image: string;
  price: number;
  author: User;
  organization: Organization;
  allergies?: string[];
};
