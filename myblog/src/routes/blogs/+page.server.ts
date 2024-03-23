// src/routes/blog/+page.server.ts
import type { Metadata } from '$types/blog';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/blogs');
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Error from server: ${response.status} ${response.statusText} ${text}`);
        }
        const metas: Metadata[] = await response.json();
        return { metas };
    } catch (error) {
        console.error("Fetching error:", error);
        return { status: 500, error: error.message };
    }
}
