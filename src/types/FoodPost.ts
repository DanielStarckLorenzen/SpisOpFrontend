import { User } from './User.ts';
import { Company } from './Company.ts';

export type FoodPost = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  authorUser: User;
  autherCompany: Company;
  communityId: string;
  lastUpdated: Date;
};

export type newFoodPost = {
  title: string;
  description: string;
  image: string;
  price: number;
  authorUser: User;
  authorCompany: Company;
  allergies?: string[];
  spaceId: number;
};
