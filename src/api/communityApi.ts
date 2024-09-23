import {newCommunityGroup} from "../types/Community.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCommunity = async (id : number) => {
    const response = await fetch(`${BASE_URL}/community/${id}`);
    return response.json();
}
export const getUserCommunities = async (id: string) => {
    const response = await fetch(`${BASE_URL}/user/${id}/communities`);
    return response.json();
}
export const createCommunity = async (community: newCommunityGroup) => {
    const response = await fetch(`${BASE_URL}/community`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(community),
    });

    if (!response.ok) {
        throw new Error('Failed to create community');
    }
    return response.json();
};