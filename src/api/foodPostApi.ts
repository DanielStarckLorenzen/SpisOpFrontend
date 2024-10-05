// Import necessary utilities and types
import { checkResponse } from './utils/checkResponse.ts';
import { newFoodPost } from '../types/FoodPost.ts';

// Set the base URL for API requests
const BASE_URL = import.meta.env.VITE_BASE_URL;

// GET requests

// Fetch all food posts
export const getAllFoodPosts = async () => {
  const response = await fetch(`${BASE_URL}/foodposts`);
  return checkResponse(response);
};

// Fetch food posts for a specific community
export const getFoodPostsByCommunity = async (id: number) => {
  const response = await fetch(`${BASE_URL}/community/${id}/foodposts`);
  return checkResponse(response);
};

// POST requests

// Create a new food post
export const createFoodPost = async (foodPost: newFoodPost) => {
  // Determine the appropriate URL based on the food post type
  const URL = 'type' in foodPost && foodPost.type === 'company'
      ? `${BASE_URL}/foodpost/company`
      : `${BASE_URL}/foodpost/community`;
  
  // Send POST request to create the food post
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodPost),
  });
  
  // Check and return the response
  return checkResponse(response);
};
