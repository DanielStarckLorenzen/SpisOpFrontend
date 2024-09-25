//This should be added to all the API calls to check if the response is ok or not.
// If the response is not ok, it will throw an error with the message from the response.
export const checkResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(`${error.message}`);
    }
    return response.json();
};