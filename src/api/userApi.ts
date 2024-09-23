import {User} from "../types/User.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}`);
  return response.json();
}

export const postUser = async (user: User) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}
