import { FoodPost } from './FoodPost.ts';
import { User } from './User.ts';

export type CommunityGroup = {
  id: string;
  name: string;
  posts?: FoodPost[];
  members?: User[];
  createdById: string;
};

export type newCommunityGroup = {
  name: string;
  members?: User[];
  createdBy?: User | null;
};
