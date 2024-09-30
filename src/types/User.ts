export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  profilePicture?: string;
  followingCommunityGroupIds?: string[];
  followingCompanyIds?: string[];
  admin?: boolean;
  managingCompanyIds?: string[];
};
