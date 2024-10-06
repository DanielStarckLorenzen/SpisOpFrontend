import { FoodPost } from './FoodPost.ts';
import { Organization } from './Organization.ts';
import { User } from './User.ts';

export type CommunityGroup = Organization & {
  posts?: FoodPost[];
  members?: User[];
  createdById: string;
};

export type newCommunityGroup = {
  name: string;
  members?: User[];
  createdBy?: User | null;
};
