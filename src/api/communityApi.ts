import { newCommunityGroup } from '../types/Community.ts';
import { checkResponse } from './utils/checkResponse.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCommunity = async (id: number) => {
  const response = await fetch(`${BASE_URL}/community/${id}`);
  return checkResponse(response);
};

export const getAllCommunities = async () => {
  const response = await fetch(`${BASE_URL}/communities`);
  return checkResponse(response);
};

export const getUserCommunities = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}/communities`);
  return checkResponse(response);
};
export const getUserOwnedCommunities = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}/owmed_communities`);
  return checkResponse(response);
};

export const createCommunity = async (community: newCommunityGroup) => {
  const response = await fetch(`${BASE_URL}/community`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(community),
  });

  return checkResponse(response);
};
