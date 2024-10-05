// Set the base URL for API requests
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Import necessary utilities and types
import { checkResponse } from './utils/checkResponse.ts';
import { Company } from '../types/Company.ts';

// Fetch all companies
export const getCompanies = async () => {
  const response = await fetch(`${BASE_URL}/company`);
  return checkResponse(response);
};

// Fetch a single company by its ID
export const getCompanyById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/company/${id}`);
  return checkResponse(response);
};

// Create a new company
export const createCompany = async (company: Company) => {
  const response = await fetch(`${BASE_URL}/company`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  });
  return checkResponse(response);
};

// Update a company by its ID
export const updateCompany = async (id: string, company: Company) => {
  const response = await fetch(`${BASE_URL}/company/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company),
  });
  return checkResponse(response);
};

// Delete a company by its ID
export const deleteCompany = async (id: string) => {
  const response = await fetch(`${BASE_URL}/company/${id}`, {
    method: 'DELETE',
  });
  return checkResponse(response);
};
