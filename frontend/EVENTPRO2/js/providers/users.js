import { settings } from '../settings.js';

export async function getUser() {
    const url = settings.apiUrl + 'data/users.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
