const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllFoodPosts = async () => {
  const response = await fetch(`${BASE_URL}/foodposts`);
  return response.json();
}
