// Import necessary types and utilities
import { newCommunityGroup } from '../types/Community.ts';
import { checkResponse } from './utils/checkResponse.ts';

// Set the base URL for API requests
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch a single community by its ID
export const getCommunity = async (id: number) => {
  const response = await fetch(`${BASE_URL}/community/${id}`);
  return checkResponse(response);
};

// Fetch all communities
export const getAllCommunities = async () => {
  const response = await fetch(`${BASE_URL}/communities`);
  return checkResponse(response);
};

// Fetch communities that a user is a member of
export const getUserCommunities = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}/communities`);
  return checkResponse(response);
};

// Fetch communities that a user owns
export const getUserOwnedCommunities = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}/owmed_communities`);
  return checkResponse(response);
};

// Create a new community
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
