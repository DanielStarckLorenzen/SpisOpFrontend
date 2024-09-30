import { User } from '../types/User.ts';
import { checkResponse } from './utils/checkResponse.ts';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}`);
  return checkResponse(response);
};

export const postUser = async (user: User) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return checkResponse(response);
};
export const putUser = async (user: User) => {
  const response = await fetch(`${BASE_URL}/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return checkResponse(response);
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(response);
};
