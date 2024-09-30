import { checkResponse } from './utils/checkResponse.ts';
import { newFoodPost } from '../types/FoodPost.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

//Get
export const getAllFoodPosts = async () => {
  const response = await fetch(`${BASE_URL}/foodposts`);
  return checkResponse(response);
};
export const getFoodPostsByCommunity = async (id: number) => {
  const response = await fetch(`${BASE_URL}/community/${id}/foodposts`);
  return checkResponse(response);
};

//Post
export const createFoodPost = async (foodPost: newFoodPost) => {
  const URL =
    foodPost.type == 'company'
      ? `${BASE_URL}/foodpost/company`
      : `${BASE_URL}/foodpost/community`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(foodPost),
  });
  return checkResponse(response);
};
